import eventlet
import socketio
import random

sio = socketio.Server(cors_allowed_origins="http://localhost:8081")
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

@sio.event
def connect(sid, environ):
    print('connect ', sid)
    sio.emit("open","ost")
    sio.emit('newTodayValue', random.randint(0, 100))  # Emit the event when a client connects

@sio.event
def ButtonPress(sid, environ):
    sio.emit('pressed', "dataisnotused")  # Emit the event when a client connects

@sio.event
def CountUpdate(sid, environ,value):
    sio.emit('newTodayValue', value)  # Emit the event when a client connects

@sio.event
def close(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('localhost', 3000)), app)
    ##
