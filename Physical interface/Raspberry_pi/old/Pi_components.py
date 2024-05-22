import RPi.GPIO as GPIO
from time import sleep
import threading
import socketio
import eventlet

button_pin = 16
counter = 0
enc_A = 35
enc_B = 33

# Lock for thread-safe access to counter variable
counter_lock = threading.Lock()


def button_init(callback_function):
    GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(button_pin, GPIO.FALLING, callback=callback_function, bouncetime=200)


def button_callback(channel):
    sleep(0.05)  # Add debounce delay
    if GPIO.input(channel) == GPIO.LOW:
        print("Button pressed")


def init_encoder():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(enc_A, GPIO.IN)
    GPIO.setup(enc_B, GPIO.IN)
    GPIO.add_event_detect(enc_A, GPIO.RISING, callback=encoder_callback, bouncetime=10)

    try:
        while True:
            sleep(0.1)
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()


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


def main():
    GPIO.setwarnings(True)
    GPIO.setmode(GPIO.BOARD)
    print("Starting script..\n")

    try:  # run inits and threads
        print("Starting button and encoder\n")

        button_init(button_callback)
        encoder_thread = threading.Thread(target=init_encoder)  # initialize encoder in a separate thread
        encoder_thread.daemon = True  # kill thread when main thread is killed
        encoder_thread.start()

        while True:  # wait and listen
            sleep(1)
    except KeyboardInterrupt:  # stop on keyboard interrupt and cleanup
        print("Stopping\n")
    finally:
        GPIO.cleanup()


if __name__ == "__main__":
    main()
