/**
 * Countdown Class (v1.2.5)
 * GoToLoop (2017/Aug/29)
 *
 * https://Forum.Processing.org/two/discussion/27733/
 * countdown-class-library-for-java-js-python#Item_1
 *
 * https://Forum.Processing.org/two/discussion/23846/
 * time-delay-in-python-mode#Item_16
 *
 * http://Bl.ocks.org/GoSubRoutine/1a0d21828319cf18fecf44101764bd60
 */
 

 
class Countdown {
  get delay() {
    return this._delay;
  }
 
  set delay(waitTime) {
    this._delay = ~~Math.abs(waitTime);
  }
 
  constructor(waitTime=0) { // milliseconds
    this.delay = waitTime;
    this.done = true;
    this._timeout = () => this.done = true;
    this.task = 0;
  }
 
  toString() {
    return 'Delay: ' + this.delay + '  -  Done: ' + this.done;
  }
 
  start() {
    clearTimeout(this.task);
    this.done = false;
    this.task = setTimeout(this._timeout, this.delay);
    return this;
  }
}