import RPi.GPIO as GPIO
from time import sleep

button_pin = 16
button_changed = False


def button_callback(channel):
    global button_changed
    sleep(0.05)  # Add debounce delay
    if GPIO.input(channel) == GPIO.LOW:
        button_changed = True
        print("Button pressed")


def button_init():
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(button_pin, GPIO.FALLING, callback=button_callback, bouncetime=200)

    try:
        while True:
            if button_changed:
                print("Button was pressed!")
                button_changed = False
            sleep(0.1)
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()


if __name__ == "__main__":
    button_init()
