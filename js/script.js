/**
 * Created by Nan on 2017/7/25.
 */
var Charts = function (id, config) {
    this.config = {
        type: config.type || 'chartLine',
        nums: config.nums,
        datas: config.datas,
        lineWidth: config.lineWidth || 3,
        color: config.color || '#80aa33',
        font: config.font | '15px scans-serif',
        bgColor: config.bgColor || 'red'
    };

    this.oCanvas = this.getId(id);
    if (this.config.type != 'circle') {
        this.oContext = this.getContext2d('2d');
    }

    this.width = this.oCanvas.width;
    this.height = this.oCanvas.height;

    this.chartLine = function () {
        this.drawnAxesBorder(this.oContext);
        this.drawnAxesLine(this.oContext);
        this.drawBlock(this.oContext);
    };

    this.graphBar = function () {
        this.drawnAxesBorder(this.oContext);
        this.drawnGraphBar(this.oContext);
        this.drawnAxesY(this.oContext);
    };

    this.chartPie = function () {


        this.drawnPie(this.oContext);
    };

    //TODO 未完待续
    this.chartCircle = function () {
        //console.log(this.oCanvas);
        //var bConvas = document.getElementById('canvas_1');
        //var fConvas = document.getElementById('canvas_2');

        //var _contextbg = bConvas.getContext('2d');
        //var _contextft = fConvas.getContext('2d');
        //this.drawCircle(this.oContext,_contextbg,_contextft);
    }
};

Charts.prototype.drawCircle = function (_contextbg, _contextft) {
    var timer = null;
    var start = 0;
    bContext.strokeStyle = '#ccc';
    bContext.lineWidth = '10';
    fContext.strokeStyle = '#f60';
    fContext.lineWidth = '10';
    fContext.fillStyle = '#f60';
    fContext.font = '30px Arial';
    bContext.beginPath();
    bContext.arc(bConvas.width / 2, bConvas.height / 2, bConvas.width / 2 - bContext.lineWidth / 2, 0, 2 * Math.PI);
    bContext.stroke();
    bContext.closePath();

    (function draw() {
        timer = requestAnimationFrame(draw);
        fContext.clearRect(0, 0, fConvas.width, fConvas.height);
        fContext.beginPath();
        fContext.arc(bConvas.width / 2, bConvas.height / 2, bConvas.width / 2 - bContext.lineWidth / 2, 0, Math.PI / 180 * start, false);
        fContext.stroke();
        fContext.closePath();
        start++;
        if (percent < 0 || percent > 100) {
            throw new Error('percent must between 0~100');
            return;
        }
        if (start > (percent / 100 * 360)) {
            window.cancelAnimationFrame(timer)
        }
        var text = parseInt(start / 360 * 100) + '%';
        fContext.beginPath();
        fContext.rotate(90 * Math.PI / 180);
        fContext.fillText(text, (fConvas.width / 2 - 10), -(fConvas.height / 2 - 10));
        fContext.closePath();
    })();
}
Charts.prototype.drawnPie = function (_context) {
    var _this = this;
    var _pai = Math.PI * 2;
    var _start = 0;
    var _end = 0;

    var data = this.config.datas;

    for (var i = 0; i < data.val.length; i++) {
        _end = _pai * data.val[i] + _start;

        _context.fillStyle = data.col[i];

        _context.beginPath();
        _context.moveTo(_this.width * (3 / 4), _this.height / 2);
        _context.arc(_this.width * (3 / 4), _this.height / 2, _this.height / 2.5, _start, _end);
        _context.closePath();

        _context.fill();
        _context.fillRect(_this.width * .1, _this.height * (1 / 4) + 20 * i, 20, 10);
        _context.fillText(data.txt[i], _this.width * .15, _this.height * (1 / 4) + 10 + 20 * i)
        _start = _end;
    }
};

Charts.prototype.drawnGraphBar = function (_context) {
    var _this = this;
    var data = _this.config.datas;


    for (var i = 0; i < data.val.length; i++) {
        _context.lineWidth = _this.config.lineWidth;
        _context.strokeStyle = data.hue[i];

        _context.beginPath();
        _context.moveTo(_this.width * .2 + 50 * i, _this.height * .9 - data.val[i] * .2);
        _context.lineTo(_this.width * .2 + 50 * i, _this.height * .9 - 1);
        _context.stroke();
        _context.fillText(data.x[i], _this.width * .18 + 50 * i, _this.height * .9 + 20)
    }
};

Charts.prototype.drawnAxesY = function (_context) {
    var _this = this;
    var data = _this.config.datas;

    var offsetX = _this.width * .15;
    var offsetY = _this.height * .15;
    var colText = _context.measureText((data['y'].length - i) * _this.height);

    for (var i = 0; i < data['y'].length; i++) {
        _context.beginPath();
        _context.fillText(data.y[i], _this.width * .03, _this.height * .2 + 40 * (data.y.length - 1 - i));
        _context.closePath();
        _context.stroke();
    }
};
Charts.prototype.drawBlock = function (_context) {
    var _this = this;
    var offsetX = _this.width * .15;
    var offsetY = _this.height * .15;
    var numbers = this.config.nums;

    for (var i = 0; i <= numbers.length; i++) {

        var numsX = i * 100 + offsetX;
        var numsY = _this.height - numbers[i] / _this.height * 100 - offsetY;
        var text = _context.measureText(numbers[i]);


        _context.font = _this.config.font;
        _context.fillStyle = _this.config.bgColor;

        _context.beginPath();
        _context.moveTo(numsX - 4, numsY);
        _context.lineTo(numsX, numsY - 4);
        _context.lineTo(numsX + 4, numsY);
        _context.lineTo(numsX, numsY + 4);

        _context.fill();
        _context.fillText(numbers[i], numsX - text.width, numsY - 10);

        if (i < 5) {
            var rowText = _context.measureText(datas[i]);
            _context.fillText(datas[i], numsX - rowText.width / 2, 570);
        } else if (i == 5) {
            return;
        }
        _context.closePath();
        _context.stroke();
    }
};

Charts.prototype.drawnAxesLine = function (_context) {

    var _this = this;
    var numbers = this.config.nums;
    var offsetX = _this.width * .15;
    var offsetY = _this.height * .15;

    for (var i = 0; i < numbers.length - 1; i++) {
        var numsX = i * 100 + offsetX;
        var numsNX = (i + 1) * 100 + offsetX;
        var numsY = _this.height - ( numbers[i] / _this.height * 100) - offsetY;
        var numsNY = _this.height - ( numbers[i + 1] / _this.height * 100 ) - offsetY;

        _context.lineWidth = _this.config.lineWidth;
        _context.strokeStyle = _this.config.color;
        _context.beginPath();
        _context.moveTo(numsX, numsY);
        _context.lineTo(numsNX, numsNY);
        _context.closePath();
        _context.stroke();
    }
};

Charts.prototype.drawnAxesBorder = function (_context) {
    _context.beginPath();
    _context.moveTo(this.width * .1, this.height * .1);
    _context.lineTo(this.width * .1, this.height * .9);
    _context.moveTo(this.width * .1, this.height * .9);
    _context.lineTo(this.width * .9, this.height * .9);
    _context.closePath();
    _context.stroke();
};

Charts.prototype.getId = function (id) {
    return document.getElementById(id);
};


Charts.prototype.getContext2d = function (val) {

    return this.oCanvas.getContext(val);

};


