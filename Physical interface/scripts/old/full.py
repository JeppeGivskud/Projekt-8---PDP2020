import eventlet
import socketio
from time import sleep
import RPi.GPIO as GPIO
import random

socket = socketio.Server(
    async_mode="eventlet", cors_allowed_origins=["http://localhost:8081", "http://hvejsel.dk:8080"]
)
app = socketio.WSGIApp(socket)

button_pin = 16
counter = 0
enc_A = 35
enc_B = 33


def server_listener():
    eventlet.wsgi.server(eventlet.listen(("", 3000)), app)


def button_init():
    GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(button_pin, GPIO.FALLING, callback=button_callback, bouncetime=200)

    while 1:  # loop to keep the thread alive
        sleep(0.1)


def button_callback(channel):
    sleep(0.05)  # Add debounce delay
    if GPIO.input(channel) == GPIO.LOW:
        print("Button pressed")
        socket.emit("pressed", "pressoboie")


def encoder_init():
    GPIO.setup(enc_A, GPIO.IN)
    GPIO.setup(enc_B, GPIO.IN)
    GPIO.add_event_detect(enc_A, GPIO.RISING, callback=encoder_callback, bouncetime=10)

    while 1:  # loop to keep the thread alive
        sleep(0.1)


def encoder_callback(channel):
    global counter  # global means that the variable is defined outside of the function
    switch_A = GPIO.input(enc_A)
    switch_B = GPIO.input(enc_B)

    # Debounce logic
    debounce_time = 0.001
    sleep(debounce_time)

    # Read switches again after debounce
    switch_A_new = GPIO.input(enc_A)
    switch_B_new = GPIO.input(enc_B)

    # Check if switches have stabilized
    if switch_A == switch_A_new and switch_B == switch_B_new:
        # Determine direction of rotation
        if switch_A == 1 and switch_B == 0:
            direction = 1  # Clockwise
        elif switch_A == 1 and switch_B == 1:
            direction = -1  # Counterclockwise
        else:
            return  # No rotation

        # Update counter based on direction
        # context manager saying that this can only be accessed by one thread at a time
        if direction == 1:
            print("Direction -> ", counter)
            if counter < 100:
                counter += 1
            else:
                counter = 100
        elif direction == -1:
            print("Direction <- ", counter)
            if counter > 0:
                counter -= 1
            else:
                counter = 0
        socket.emit("encoder", counter)


def main():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(True)

    @socket.on("connect")
    def connect(sid, environ):
        print("connect ", sid)
        socket.emit("encoder", 20)
        socket.start_background_task(button_init)  # button thread
        socket.start_background_task(encoder_init)  # encoder thread
        socket.start_background_task(server_listener)

    print("starting script")
    server_listener()

    while True:
        sleep(0.1)


if __name__ == "__main__":
    main()
