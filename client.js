const dgram = require('dgram')
const socket = dgram.createSocket('udp4')

const PORT = process.env.PORT || 3000

socket.bind()
socket.on('listening', () => {
  socket.setBroadcast(true)

  // 255.255.255.255 - boradcast for local network - RFC922
  socket.send('hi', PORT, '255.255.255.255', (err) => {
    console.log(err ? err : 'Sended')
    // socket.close();
  })

  socket.on('message', (buffer, sender) => {
    const message = buffer.toString()
    console.log(`Received message: ${message} from ${sender.address}`)
    socket.close()
  })
})
