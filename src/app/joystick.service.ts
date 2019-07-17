import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class JoystickService {

    context: any;
    centerX: any;
    centerY: any;
    externalRadius: any;
    circumference: any;
    movedX: any;
    movedY: any;
    title: any;
    width: any;
    height: any;
    internalFillColor: any;
    internalLineWidth: any;
    internalStrokeColor: any;
    externalLineWidth: any;
    externalStrokeColor: any;
    internalRadius: any;
    maxMoveStick: any;
    canvas: any;
    pressed: any;
    directionHorizontalLimitPos: any;
    directionHorizontalLimitNeg: any;
    directionVerticalLimitPos: any;
    directionVerticalLimitNeg: any;

    constructor() {
        console.log('Hello Singleton Joystick Service');
    }

    init(container, canvas) {
        this.title = 'joystick';
        this.width = 0;
        this.height = 0;
        this.internalFillColor = '#efed1f';
        this.internalLineWidth = 2;
        this.internalStrokeColor = '#5f5e26';
        this.externalLineWidth = 2;
        this.externalStrokeColor = '#bebc18';

        // Create Canvas element and add it in the Container object
        let objContainer = container;
        //this.canvas = document.createElement('canvas');
        this.canvas = canvas;
        //this.canvas.id = this.title;
        if (this.width == 0) {
            this.width = objContainer.clientWidth;
        }
        if (this.height == 0) {
            this.height = objContainer.clientHeight;
        }
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        //objContainer.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.pressed = 0; // Bool - 1=Yes - 0=No
        this.circumference = 2 * Math.PI;
        this.internalRadius = (this.canvas.width - ((50 * 2) + 10)) / 2;
        this.maxMoveStick = this.internalRadius + 5;
        this.externalRadius = this.internalRadius + 30;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.directionHorizontalLimitPos = this.canvas.width / 10;
        this.directionHorizontalLimitNeg = this.directionHorizontalLimitPos * -1;
        this.directionVerticalLimitPos = this.canvas.height / 10;
        this.directionVerticalLimitNeg = this.directionVerticalLimitPos * -1;
        // Used to save current position of stick
        this.movedX = this.centerX;
        this.movedY = this.centerY;

        // Check if the device support the touch or not
        /*let touchable = 'createTouch' in document;
        if (touchable) {
            this.canvas.addEventListener('touchstart', this.onTouchStart, false);
            this.canvas.addEventListener('touchmove', this.onTouchMove, false);
            this.canvas.addEventListener('touchend', this.onTouchEnd, false);
        } else {
            this.canvas.addEventListener('mousedown', this.onMouseDown, false);
            this.canvas.addEventListener('mousemove', this.onMouseMove, false);
            this.canvas.addEventListener('mouseup', this.onMouseUp, false);
        }*/
        // Draw the object
        this.drawExternal();
        this.drawInternal();
    }

    /******************************************************
     * Private methods
     *****************************************************/
    /**
     * @desc Draw the external circle used as reference position
     */

    drawExternal() {
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.externalRadius, 0, this.circumference, false);
        this.context.lineWidth = this.externalLineWidth;
        this.context.strokeStyle = this.externalStrokeColor;
        this.context.stroke();
    }

    /**
     * @desc Draw the internal stick in the current position the user have moved it
     */
    drawInternal() {
        this.context.beginPath();
        if (this.movedX < this.internalRadius) {
            this.movedX = this.maxMoveStick;
        }
        if ((this.movedX + this.internalRadius) > this.canvas.width) {
            this.movedX = this.canvas.width - (this.maxMoveStick);
        }
        if (this.movedY < this.internalRadius) {
            this.movedY = this.maxMoveStick;
        }
        if ((this.movedY + this.internalRadius) > this.canvas.height) {
            this.movedY = this.canvas.height - (this.maxMoveStick);
        }
        this.context.arc(this.movedX, this.movedY, this.internalRadius, 0, this.circumference, false);
        // create radial gradient
        var grd = this.context.createRadialGradient(this.centerX, this.centerY, 5, this.centerX, this.centerY, 200);
        // Light color
        grd.addColorStop(0, this.internalFillColor);
        // Dark color
        grd.addColorStop(1, this.internalStrokeColor);
        this.context.fillStyle = grd;
        this.context.fill();
        this.context.lineWidth = this.internalLineWidth;
        this.context.strokeStyle = this.internalStrokeColor;
        this.context.stroke();
    }

    /**
     * @desc Events for manage touch
     */
    onTouchStart(event) {
        this.pressed = 1;
    }

    onTouchMove(event) {
        // Prevent the browser from doing its default thing (scroll, zoom)
        event.preventDefault();
        if (this.pressed == 1) {
            this.movedX = event.touches[0].pageX;
            this.movedY = event.touches[0].pageY;
            // Manage offset
            this.movedX -= this.canvas.offsetLeft;
            this.movedY -= this.canvas.offsetTop;
            // Delete canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Redraw object
            this.drawExternal();
            this.drawInternal();
        }
    }

    onTouchEnd(event) {
        this.pressed = 0;
        // Reset position store variable
        this.movedX = this.centerX;
        this.movedY = this.centerY;
        // Delete canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Redraw object
        this.drawExternal();
        this.drawInternal();
        //canvas.unbind('touchmove');
    }

    /**
     * @desc Events for manage mouse
     */

    onMouseDown(event) {
        this.pressed = 1;
    }

    onMouseMove(event) {
        if (this.pressed == 1) {
            this.movedX = event.pageX;
            this.movedY = event.pageY;
            // Manage offset
            this.movedX -= this.canvas.offsetLeft;
            this.movedY -= this.canvas.offsetTop;
            // Delete canvas
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Redraw object
            this.drawExternal();
            this.drawInternal();
        }
    }

    onMouseUp(event) {
        this.pressed = 0;
        // Reset position store variable
        this.movedX = this.centerX;
        this.movedY = this.centerY;
        // Delete canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Redraw object
        this.drawExternal();
        this.drawInternal();
        //canvas.unbind('mousemove');
    }
}
