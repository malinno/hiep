import React, { Component } from 'react';

class Circle extends Component {
  componentDidMount() {
    this.drawCircle();
  }

  drawCircle() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    // Tọa độ tâm của vòng tròn
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Bán kính của vòng tròn
    const radius = 50;

    // Đặt màu và độ dày nét vẽ
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;

    // Bắt đầu vẽ hình tròn
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  render() {
    return (
      <canvas ref="canvas" width={500} height={500} />
    );
  }
}

export default Circle;
