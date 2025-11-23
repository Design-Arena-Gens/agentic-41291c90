'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1024;
    const height = 1024;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 1.5);
    bgGradient.addColorStop(0, '#0a1628');
    bgGradient.addColorStop(1, '#000000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Isometric container setup
    const centerX = width / 2;
    const centerY = height / 2 + 50;
    const containerWidth = 400;
    const containerHeight = 280;
    const containerDepth = 220;

    // Helper function for isometric projection
    const isoX = (x: number, y: number) => centerX + (x - y) * Math.cos(Math.PI / 6);
    const isoY = (x: number, y: number, z: number) => centerY + (x + y) * Math.sin(Math.PI / 6) - z;

    // Draw container back face
    ctx.fillStyle = 'rgba(15, 25, 40, 0.95)';
    ctx.strokeStyle = 'rgba(40, 60, 85, 0.8)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, 0));
    ctx.lineTo(isoX(0, 0), isoY(0, 0, 0));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw corrugated texture on back face
    for (let i = 0; i < 15; i++) {
      const offset = (containerHeight / 15) * i;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(25, 35, 50, 0.6)' : 'rgba(45, 60, 85, 0.4)';
      ctx.lineWidth = containerHeight / 15;
      ctx.beginPath();
      ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight - offset));
      ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight - offset));
      ctx.stroke();
    }

    // Draw container left face (darker)
    ctx.fillStyle = 'rgba(10, 18, 30, 0.95)';
    ctx.strokeStyle = 'rgba(30, 45, 65, 0.8)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight));
    ctx.lineTo(isoX(0, containerDepth), isoY(0, containerDepth, containerHeight));
    ctx.lineTo(isoX(0, containerDepth), isoY(0, containerDepth, 0));
    ctx.lineTo(isoX(0, 0), isoY(0, 0, 0));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw corrugated texture on left face
    for (let i = 0; i < 15; i++) {
      const offset = (containerHeight / 15) * i;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(18, 28, 42, 0.6)' : 'rgba(35, 50, 75, 0.4)';
      ctx.lineWidth = containerHeight / 15;
      ctx.beginPath();
      ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight - offset));
      ctx.lineTo(isoX(0, containerDepth), isoY(0, containerDepth, containerHeight - offset));
      ctx.stroke();
    }

    // Draw container top face (glass effect)
    const topGradient = ctx.createLinearGradient(
      isoX(0, 0), isoY(0, 0, containerHeight),
      isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, containerHeight)
    );
    topGradient.addColorStop(0, 'rgba(30, 45, 65, 0.7)');
    topGradient.addColorStop(0.5, 'rgba(45, 65, 90, 0.5)');
    topGradient.addColorStop(1, 'rgba(25, 40, 60, 0.7)');

    ctx.fillStyle = topGradient;
    ctx.strokeStyle = 'rgba(60, 80, 110, 0.9)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, containerHeight));
    ctx.lineTo(isoX(0, containerDepth), isoY(0, containerDepth, containerHeight));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glass reflection on top
    ctx.fillStyle = 'rgba(100, 140, 180, 0.15)';
    ctx.beginPath();
    ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth * 0.6, 0), isoY(containerWidth * 0.6, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth * 0.5, containerDepth * 0.5), isoY(containerWidth * 0.5, containerDepth * 0.5, containerHeight));
    ctx.lineTo(isoX(0, containerDepth * 0.4), isoY(0, containerDepth * 0.4, containerHeight));
    ctx.closePath();
    ctx.fill();

    // Draw container right face (lighter, glass effect)
    const rightGradient = ctx.createLinearGradient(
      isoX(containerWidth, 0), isoY(containerWidth, 0, 0),
      isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, 0)
    );
    rightGradient.addColorStop(0, 'rgba(20, 32, 50, 0.85)');
    rightGradient.addColorStop(1, 'rgba(15, 25, 40, 0.9)');

    ctx.fillStyle = rightGradient;
    ctx.strokeStyle = 'rgba(50, 70, 95, 0.8)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, containerHeight));
    ctx.lineTo(isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, 0));
    ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, 0));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw corrugated texture on right face
    for (let i = 0; i < 15; i++) {
      const offset = (containerHeight / 15) * i;
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(22, 32, 48, 0.6)' : 'rgba(40, 55, 78, 0.4)';
      ctx.lineWidth = containerHeight / 15;
      ctx.beginPath();
      ctx.moveTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight - offset));
      ctx.lineTo(isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, containerHeight - offset));
      ctx.stroke();
    }

    // Container door details
    const doorX = containerWidth * 0.15;
    const doorWidth = containerWidth * 0.7;

    ctx.strokeStyle = 'rgba(60, 80, 110, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(isoX(doorX, containerDepth), isoY(doorX, containerDepth, containerHeight * 0.9));
    ctx.lineTo(isoX(doorX, containerDepth), isoY(doorX, containerDepth, containerHeight * 0.1));
    ctx.lineTo(isoX(doorX + doorWidth, containerDepth), isoY(doorX + doorWidth, containerDepth, containerHeight * 0.1));
    ctx.lineTo(isoX(doorX + doorWidth, containerDepth), isoY(doorX + doorWidth, containerDepth, containerHeight * 0.9));
    ctx.stroke();

    // Door center line
    ctx.beginPath();
    ctx.moveTo(isoX(containerWidth / 2, containerDepth), isoY(containerWidth / 2, containerDepth, containerHeight * 0.9));
    ctx.lineTo(isoX(containerWidth / 2, containerDepth), isoY(containerWidth / 2, containerDepth, containerHeight * 0.1));
    ctx.stroke();

    // Glowing numbers inside
    const numbers = ['0', '1', '1', '0', '1', '0', '0', '1'];
    ctx.font = 'bold 48px monospace';
    ctx.shadowBlur = 30;
    ctx.shadowColor = '#00ff88';

    numbers.forEach((num, i) => {
      const x = isoX(containerWidth * 0.25 + (i % 4) * 65, containerDepth * 0.7);
      const y = isoY(containerWidth * 0.25 + (i % 4) * 65, containerDepth * 0.7, containerHeight * 0.6 - Math.floor(i / 4) * 60);

      // Glow effect
      ctx.fillStyle = '#00ff88';
      ctx.fillText(num, x, y);

      // Core number
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#88ffcc';
      ctx.fillText(num, x, y);
    });

    ctx.shadowBlur = 0;

    // Gold coins
    const coins = [
      { x: 0.6, y: 0.5, z: 0.25, size: 35 },
      { x: 0.7, y: 0.6, z: 0.3, size: 30 },
      { x: 0.55, y: 0.65, z: 0.35, size: 28 },
      { x: 0.65, y: 0.45, z: 0.4, size: 32 },
      { x: 0.75, y: 0.55, z: 0.2, size: 26 },
    ];

    coins.forEach(coin => {
      const cx = isoX(containerWidth * coin.x, containerDepth * coin.y);
      const cy = isoY(containerWidth * coin.x, containerDepth * coin.y, containerHeight * coin.z);

      // Coin glow
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#ffd700';

      // Coin gradient
      const coinGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coin.size);
      coinGradient.addColorStop(0, '#ffed4e');
      coinGradient.addColorStop(0.3, '#ffd700');
      coinGradient.addColorStop(0.7, '#cc9900');
      coinGradient.addColorStop(1, '#997700');

      ctx.fillStyle = coinGradient;
      ctx.beginPath();
      ctx.ellipse(cx, cy, coin.size, coin.size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Coin edge
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#aa8800';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Coin shine
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.ellipse(cx - coin.size * 0.2, cy - coin.size * 0.1, coin.size * 0.3, coin.size * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // Additional atmospheric glow
    ctx.shadowBlur = 80;
    ctx.shadowColor = '#00ff88';
    ctx.fillStyle = 'rgba(0, 255, 136, 0.03)';
    ctx.fillRect(
      isoX(containerWidth * 0.2, containerDepth * 0.4),
      isoY(containerWidth * 0.2, containerDepth * 0.4, containerHeight * 0.7),
      200,
      150
    );

    ctx.shadowBlur = 60;
    ctx.shadowColor = '#ffd700';
    ctx.fillStyle = 'rgba(255, 215, 0, 0.03)';
    ctx.fillRect(
      isoX(containerWidth * 0.5, containerDepth * 0.5),
      isoY(containerWidth * 0.5, containerDepth * 0.5, containerHeight * 0.4),
      180,
      130
    );

    // Edge highlights for glass effect
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(120, 160, 200, 0.3)';
    ctx.lineWidth = 1.5;

    // Top edges
    ctx.beginPath();
    ctx.moveTo(isoX(0, 0), isoY(0, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(isoX(containerWidth, 0), isoY(containerWidth, 0, containerHeight));
    ctx.lineTo(isoX(containerWidth, containerDepth), isoY(containerWidth, containerDepth, containerHeight));
    ctx.stroke();

  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      flexDirection: 'column',
      gap: '30px'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          maxWidth: '90vmin',
          maxHeight: '90vmin',
          width: '1024px',
          height: '1024px',
          imageRendering: 'auto'
        }}
      />
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          const canvas = canvasRef.current;
          if (canvas) {
            const link = document.createElement('a');
            link.download = 'cyber-container-icon-8k.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
          }
        }}
        style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
          color: '#000',
          textDecoration: 'none',
          borderRadius: '8px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: '600',
          fontSize: '16px',
          boxShadow: '0 4px 20px rgba(0, 255, 136, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Download 8K Icon
      </a>
    </div>
  );
}
