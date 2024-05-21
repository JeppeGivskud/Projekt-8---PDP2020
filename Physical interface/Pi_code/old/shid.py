import eventlet
import socketio
from time import sleep
import RPi.GPIO as GPIO
import threading

socket = socketio.Server(
    async_mode="eventlet", cors_allowed_origins=["http://localhost:8081", "http://hvejsel.dk:8080"]
)
app = socketio.WSGIApp(socket)

button_pin = 16
button_state = 0


def server_listener():
    eventlet.wsgi.server(eventlet.listen(("", 3000)), app)


def button_init():
    global socket
    GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(button_pin, GPIO.FALLING, callback=button_callback, bouncetime=200)

    while 1:  # loop to keep the thread alive
        sleep(0.1)


def button_callback(channel):
    global socket, button_state
    sleep(0.05)  # Add debounce delay
    if GPIO.input(channel) == GPIO.LOW:
        button_state = 1
        print("Button pressed")


def send_button():
    global button_state, socket
    while 1:
        if button_state == 1:
            socket.emit("encoder", 80)
            print("send_button: sent ", 80)
            button_state = 0
        sleep(0.1)


def main():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(True)

    @socket.on("connect")
    def connect(sid, environ):
        print("connect ", sid)
        socket.emit("open")
        socket.emit("encoder", 20)
        socket.start_background_task(send_button)

    try:
        button_thread = threading.Thread(target=button_init)  # initialize encoder in a separate thread
        button_thread.daemon = True  # kill thread when main thread is killed
        button_thread.start()
        server_listener()
    finally:
        GPIO.cleanup()


if __name__ == "__main__":
    main()
