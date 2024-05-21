import pigpio
from time import sleep
import time
import socketio
import eventlet

sio = socketio.Server(async_mode="eventlet", cors_allowed_origins=["http://localhost:8081", "http://hvejsel.dk:8080"])
app = socketio.WSGIApp(sio)

button_pin = 23
enc_A = 19
enc_B = 13
debounce_time_button = 0.3  # debounce time in seconds
counter = 0  # encoder counter
button_state = 0  # button state
button_changed = False
encoder_changed = False

pi = pigpio.pi()  # create a pigpio object
last_press_time = 0  # time of the last button press


def send_button():
    global button_state, sio, button_changed
    while True:
        if button_changed:
            if button_state == 1:
                sio.emit("pressed", "pressed")  # TODO  change to button
                print("sent pressed")
                button_state = 0
                button_changed = True
            eventlet.sleep(0.1)


def send_encoder():
    global counter, sio, encoder_changed
    while True:
        if encoder_changed:
            sio.emit("encoder", counter)
            print("send_encoder: sent ", counter)
            encoder_changed = False
            eventlet.sleep(0.1)


def button_callback(gpio, level, tick):
    global last_press_time, button_state, button_changed
    current_time = time.time()
    if current_time - last_press_time >= debounce_time_button:  # if enough time has passed since the last press
        if level == 0:  # if button is pressed
            print("Button pressed")
            button_state = 1
            button_changed = True
            last_press_time = current_time  # update the time of the last button press


def encoder_callback(gpio, level, tick):
    global counter, encoder_changed  # global means that the variable is defined outside of the function
    switch_A = pi.read(enc_A)
    switch_B = pi.read(enc_B)

    # Debounce logic
    debounce_time_encoder = 0.001
    sleep(debounce_time_encoder)

    # Read switches again after debounce
    switch_A_new = pi.read(enc_A)
    switch_B_new = pi.read(enc_B)

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
        encoder_changed = True


def button_init():
    pi.set_mode(button_pin, pigpio.INPUT)
    pi.set_pull_up_down(button_pin, pigpio.PUD_UP)
    pi.callback(button_pin, pigpio.FALLING_EDGE, button_callback)
    print("button initialized")


def encoder_init():
    pi.set_mode(enc_A, pigpio.INPUT)
    pi.set_mode(enc_B, pigpio.INPUT)
    pi.callback(enc_A, pigpio.RISING_EDGE, encoder_callback)
    print("encoder initialized")


@sio.on("connect")
def connect(sid, environ):
    print("connect ", sid)
    sio.emit("open")
    button_init()
    encoder_init()
    eventlet.spawn(send_button)
    eventlet.spawn(send_encoder)


def main():
    try:
        eventlet.wsgi.server(eventlet.listen(("", 3000)), app)
    finally:
        pi.stop()  # stop the pigpio object when the program is terminated


if __name__ == "__main__":
    main()
