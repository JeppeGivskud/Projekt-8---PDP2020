import RPi.GPIO as GPIO  # type: ignore # this library only works on Raspberry Pi, so the warning is being ignored
from time import sleep
import threading
import socketio
import eventlet


class Button:
    def __init__(self, pin):
        """Initialize the button. Attach event detection to the pin to trigger callback on button press.

        Args:
            pin (int): Pin number for the button. Use physical pin numbers.
        """
        self.pin = pin
        self.changed = False
        self.lock = threading.Lock()
        GPIO.setup(self.pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.add_event_detect(self.pin, GPIO.FALLING, callback=self.callback, bouncetime=200)

    def callback(self, channel):
        sleep(0.05)  # Add debounce delay
        if GPIO.input(channel) == GPIO.LOW:
            with self.lock:
                self.changed = True
                print("Button pressed")

    def send(self, sio):
        while True:
            with self.lock:
                if self.changed:
                    sio.emit("pressed", "pressed")
                    print("sent pressed")
                    self.changed = False
            eventlet.sleep(0.001)


class Encoder:
    def __init__(self, pin_A, pin_B):
        """Initialize the encoder. Attach event detection to pin_A to trigger callback on rotation.

        Args:
            pin_A (int): Pin number for encoder switch A. Use physical pin numbers.
            pin_B (int): Pin number for encoder switch B. Use physical pin numbers.
        """
        self.pin_A = pin_A
        self.pin_B = pin_B
        self.counter = 0
        self.changed = False
        self.lock = threading.Lock()
        GPIO.setup(self.pin_A, GPIO.IN)
        GPIO.setup(self.pin_B, GPIO.IN)
        GPIO.add_event_detect(self.pin_A, GPIO.RISING, callback=self.callback, bouncetime=10)

    def callback(self, channel):
        # First read
        switch_A = GPIO.input(self.pin_A)
        switch_B = GPIO.input(self.pin_B)

        # Debounce logic
        sleep(0.001)

        # Read switches again after debounce
        switch_A_new = GPIO.input(self.pin_A)
        switch_B_new = GPIO.input(self.pin_B)

        # Check if switches have stabilized. Stabilized means that the switches have not changed state during the debounce time.
        if switch_A == switch_A_new and switch_B == switch_B_new:
            # Determine direction of rotation
            if switch_A == 1 and switch_B == 0:
                direction = "clockwise"
            elif switch_A == 1 and switch_B == 1:
                direction = "Counterclockwise"
            else:
                return  # No rotation

            # Update counter based on direction
            if direction == "clockwise":
                if self.counter < 100:
                    self.counter += 1
                else:
                    self.counter = 100
                print("Direction -> ", self.counter)
            elif direction == "Counterclockwise":
                if self.counter > -5:
                    self.counter -= 1
                else:
                    self.counter = -5
                print("Direction <- ", self.counter)
            with self.lock:
                self.changed = True

    def send(self, sio):
        """Function for sending the encoder value to the client. This function will run in a separate event thread. It will send the encoder value to the client when the value has changed."""
        while True:
            with self.lock:
                if self.changed:
                    sio.emit("encoder", self.counter)
                    print("send_encoder: sent ", self.counter)
                    self.changed = False
            eventlet.sleep(0.001)

    def set_counter(self, value):
        with self.lock:
            self.counter = value


class Server:
    def __init__(self, button, encoder):
        """Initialize the server with the button and encoder objects. The server is setup to use the eventlet async_mode. It allows communication from localhost:8081 and hvejsel.dk:8080.

        Args:
            button (Button object): Pass the button object to the server.
            encoder (Encoder object): Pass the encoder object to the server.
        """
        self.sio = socketio.Server(
            async_mode="eventlet", cors_allowed_origins=["http://localhost:8081", "http://hvejsel.dk:8080"]
        )
        self.app = socketio.WSGIApp(self.sio)
        self.button = button
        self.encoder = encoder
        self.sio.on("connect", self.connect)
        self.sio.on("sendCount", self.set_count)

    def connect(self, sid, environ):
        print("connect ", sid, "\n")
        self.sio.emit("getCount", "getCount")

        # spawn the button and encoder threads. These threads will run in the background and send data to the client when the values change.
        # it is important that these are eventlet threads, as the threadding library in python does't work with the eventlet async_mode.
        eventlet.spawn(self.button.send, self.sio)
        eventlet.spawn(self.encoder.send, self.sio)
        print("Button and encoder started\n")

    def set_count(self, sid, data):
        self.encoder.set_counter(data)
        print("recieved setCount: ", data)
        self.sio.emit("encoder", self.encoder.counter)

    def listen(self):
        eventlet.wsgi.server(eventlet.listen(("", 3000)), self.app)


def main():
    GPIO.setwarnings(True)
    GPIO.setmode(GPIO.BOARD)
    print("Starting script..\n")

    button = Button(16)
    encoder = Encoder(35, 33)
    server = Server(button, encoder)

    try:  # start the server
        server.listen()  # main thread

    except KeyboardInterrupt:  # stop on keyboard interrupt and cleanup
        print("Stopping\n")
    finally:
        GPIO.cleanup()


if __name__ == "__main__":
    main()
