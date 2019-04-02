inlets = 2
outlets = 5 //set outlet

var meme = 0;

var data = [];
var data_index = 0;

function bang()
{
  if (data_index >= data.length) { return }

  //post(data_index, data[data_index], "\n");
  var x1 = data[data_index][0];
  var y1 = data[data_index][1];
  var x2 = data[data_index][2];
  var y2 = data[data_index][3];

  outlet(0, x1);
  outlet(1, y1);
  outlet(2, x2);
  outlet(3, y2);
  outlet(4, data_index);

  data_index++;
}

function list()
{
    var a = arrayfromargs(arguments);
    var pitch = arguments[0];
    var velocity = arguments[1];
    data = [];
    data_index = 0;
    angle1 = -90 + 5*Math.random();
    angle2 = -90 + 5*Math.random();
    constant.pendulum1.length = Math.random();
    constant.pendulum2.length = Math.random();
    constant.pendulum1.mass = Math.random();
    constant.pendulum2.mass = Math.random();
    //post(JSON.stringify(constant, null, 2), "\n");
    double_pendulum(0, 10, angle1, 0, angle2, 0, 1000,
      function (t, th1, w1, th2, w2) {
        var x1 = constant.pendulum1.length * Math.cos(th1);
        var y1 = constant.pendulum1.length * Math.sin(th1);
        var x2 = x1 + constant.pendulum2.length * Math.cos(th2);
        var y2 = y1 + constant.pendulum2.length * Math.sin(th2);

        data.push([x1, y1, x2, y2]);
      }
    );
}

// solve_dpend.js
//
// Code rewritten from Professor M.S. Wheatland's C code.
//

var constant = {
  equations : 4, // Number of equations to be solved.
  gravity : 9.8, // Acceleration due to gravity (m/s^2).
  pendulum1 : {
    length : 1, // meters
    mass : 1    // kilograms
  },
  pendulum2 : {
    length : 1, // meters
    mass : 1    // kilograms
  }
};

function double_pendulum(TMIN, TMAX, TH10, W10, TH20, W20, NSTEP, record) {
  var i = 0;
  var yin = new Array(constant.equations);
  var yout = new Array(constant.equations);
  var t, th1, th2, w1, w2;

  // integration step size
  var h = (TMAX - TMIN) / (NSTEP - 1.0);

  // initial values; convert to radians
  t = TMIN;
  th1 = TH10 * Math.PI / 180;
  w1 = W10 * Math.PI / 180;
  th2 = TH20 * Math.PI / 180;
  w2 = W20 * Math.PI / 180;

  // perform integration
  record(t, th1, w1, th2, w2);
  for (i = 0; i < NSTEP; i++) {
    t = TMIN + h * i;
    yin[0] = th1;
    yin[1] = w1;
    yin[2] = th2;
    yin[3] = w2;
    runge_kutta(t, yin, yout, h);
    th1 = yout[0];
    w1 = yout[1];
    th2 = yout[2];
    w2 = yout[3];
    record(t, th1, w1, th2, w2);
  }
}

function derivs(xin, yin, dydx) {
  // function to fill array of derivatives dydx at xin
  var den1, den2, del;

  dydx[0] = yin[1];

  del = yin[2] - yin[0];
  den1 = (constant.pendulum1.mass + constant.pendulum2.mass) *
             constant.pendulum1.length -
         constant.pendulum2.mass * constant.pendulum1.length *
             Math.pow(Math.cos(del), 2);
  dydx[1] = (constant.pendulum2.mass * constant.pendulum1.length *
                 Math.pow(yin[1], 2) * Math.sin(del) * Math.cos(del) +
             constant.pendulum2.mass * constant.gravity * Math.sin(yin[2]) *
                 Math.cos(del) +
             constant.pendulum2.mass * constant.pendulum2.length *
                 Math.pow(yin[3], 2) * Math.sin(del) -
             (constant.pendulum1.mass + constant.pendulum2.mass) *
                 constant.gravity * Math.sin(yin[0])) /
            den1;

  dydx[2] = yin[3];

  den2 = (constant.pendulum2.length / constant.pendulum1.length) * den1;
  dydx[3] =
      (-constant.pendulum2.mass * constant.pendulum2.length *
           Math.pow(yin[3], 2) * Math.sin(del) * Math.cos(del) +
       (constant.pendulum1.mass + constant.pendulum2.mass) * constant.gravity *
           Math.sin(yin[0]) * Math.cos(del) -
       (constant.pendulum1.mass + constant.pendulum2.mass) *
           constant.pendulum1.length * Math.pow(yin[1], 2) * Math.sin(del) -
       (constant.pendulum1.mass + constant.pendulum2.mass) * constant.gravity *
           Math.sin(yin[2])) /
      den2;
}

function runge_kutta(xin, yin, yout, h) {
  // fourth order Runge-Kutta
  var i = 0;
  var hh = 0.5 * h;
  var xh = xin + hh;
  var dydx = new Array(constant.equations);
  var dydxt = new Array(constant.equations);
  var yt = new Array(constant.equations);
  var k1 = new Array(constant.equations);
  var k2 = new Array(constant.equations);
  var k3 = new Array(constant.equations);
  var k4 = new Array(constant.equations);

  // first step
  derivs(xin, yin, dydx);
  for (i = 0; i < constant.equations; i++) {
    k1[i] = h * dydx[i];
    yt[i] = yin[i] + 0.5 * k1[i];
  }

  // second step
  derivs(xh, yt, dydxt);
  for (i = 0; i < constant.equations; i++) {
    k2[i] = h * dydxt[i];
    yt[i] = yin[i] * 0.5 * k2[i];
  }

  // third step
  derivs(xh, yt, dydxt);
  for (i = 0; i < constant.equations; i++) {
    k3[i] = h * dydxt[i];
    yt[i] = yin[i] + k3[i];
  }

  // fourth step
  derivs(xin + h, yt, dydxt);
  for (i = 0; i < constant.equations; i++) {
    k4[i] = h * dydxt[i];
    yout[i] = yin[i] + k1[i] / 6 + k2[i] / 3 + k3[i] / 3 + k4[i] / 6;
  }
}
