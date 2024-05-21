import RPi.GPIO as GPIO
from time import sleep

enc_A = 35
enc_B = 33
counter = 0


def encoder_callback(channel):
    global counter
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


if __name__ == "__main__":
    init_encoder()
