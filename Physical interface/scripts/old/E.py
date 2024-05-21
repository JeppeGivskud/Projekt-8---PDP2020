import asyncio
from aiohttp import web
import socketio
import RPi.GPIO as GPIO
from time import sleep

sio = socketio.AsyncServer()
app = web.Application()
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(True)
button_pin = 10  # replace with your actual pin number


def button_callback(channel):
    asyncio.create_task(button_pressed(channel))


async def button_pressed(channel):
    sleep(0.05)  # Add debounce delay
    if GPIO.input(channel) == GPIO.LOW:
        print("Button pressed")
        await sio.emit("encoder", 80)  # Emit the event to all connected clients
        print("sent", 80)


async def main():
    @sio.on("connect")
    async def connect(sid, environ):
        print("connect ", sid)
        await sio.emit("encoder", 20)  # Dummy emit on connect

    sio.attach(app)
    await app.run_event_loop()


if __name__ == "__main__":
    GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.add_event_detect(button_pin, GPIO.FALLING, callback=button_callback, bouncetime=200)
    asyncio.run(main())
