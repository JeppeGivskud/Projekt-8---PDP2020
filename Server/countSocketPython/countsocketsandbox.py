import eventlet
import socketio
import random

# WORKING EXAMPLE

socket = socketio.Server(
    async_mode="eventlet", cors_allowed_origins=["http://localhost:8081", "http://hvejsel.dk:8080"]
)
app = socketio.WSGIApp(socket)
## ssh pi@G883
## kode: 12345
## ssh file transfer scp


def worker1():
    eventlet.wsgi.server(eventlet.listen(("", 3000)), app)


def worker2():
    while 1:
        socket.emit("newTodayValue", 40)  # Emit the event when a client connects
        socket.sleep(1)
        socket.emit("newTodayValue", 60)  # Emit the event when a client connects
        socket.sleep(1)
        socket.emit("newTodayValue", 60)  # Emit the event when a client connects
        socket.sleep(1)
        socket.emit("pressed", "pressoboie")  # Emit the event when a client connects
        socket.sleep(1)
        print("full circle")


def main():
    @socket.on("connect")
    def connect(sid, environ):
        print("connect ", sid)
        socket.start_background_task(worker2)

    worker1()


if __name__ == "__main__":
    main()
