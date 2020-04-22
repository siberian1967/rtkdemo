const path = "COM5"
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(path, { baudRate: 256000 })
const { NtripClient } = require('ntrip-client');

const options = {
  host: 'rtk2go.com',
  port: 2101,
  mountpoint: 'ABIOS',
  username: 'test',
  password: 'test',
  xyz: [-1983430.2365, -4937492.4088, 3505683.7925],
  // the interval of send nmea, unit is millisecond
  interval: 2000,
};

const client = new NtripClient(options);

client.on('data', (data) => {
  console.log(data);
  port.write(data);
});

client.on('close', () => {
  console.log('client close');
});

client.on('error', (err) => {
  console.log(err);
});

client.run();