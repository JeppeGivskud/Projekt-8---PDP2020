import pigpio
from time import sleep
import time

enc_A = 19
enc_B = 13
counter = 0  # encoder counter
encoder_changed = False

pi = pigpio.pi()  # create a pigpio object


def encoder_callback(gpio, level, tick):
    global counter, encoder_changed
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
        if direction == 1:
            if counter < 100:
                counter += 1
            else:
                counter = 100
            print("Direction -> ", counter)
        elif direction == -1:

            if counter > 0:
                counter -= 1
            else:
                counter = 0
            print("Direction <- ", counter)
        encoder_changed = True


def encoder_init():
    pi.set_mode(enc_A, pigpio.INPUT)
    pi.set_mode(enc_B, pigpio.INPUT)
    pi.callback(enc_A, pigpio.RISING_EDGE, encoder_callback)
    print("encoder initialized")


def main():
    global counter, encoder_changed
    try:
        encoder_init()
        while True:
            if encoder_changed:
                print("Encoder value: ", counter)
                encoder_changed = False
            sleep(0.1)
    finally:
        pi.stop()  # stop the pigpio object when the program is terminated


if __name__ == "__main__":
    main()
