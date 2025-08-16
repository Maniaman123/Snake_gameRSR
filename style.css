* {
    user-select: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
}

.container {
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 2.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.score-board {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1.2em;
    font-weight: bold;
    flex-wrap: wrap;
    gap: 10px;
}

.score,
.high-score,
.obstacles {
    background: #f0f0f0;
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 120px;
}

#gameCanvas {
    border: 3px solid #667eea;
    border-radius: 10px;
    background: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.countdown-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(102, 126, 234, 0.9);
    color: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    z-index: 100;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    display: none;
}

.countdown-text {
    font-size: 4em;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: pulse 1s ease-in-out infinite;
}

.countdown-label {
    font-size: 1.5em;
    opacity: 0.9;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.controls {
    margin-top: 20px;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 25px;
    margin: 0 10px;
    border-radius: 25px;
    font-size: 1.1em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button:hover {
    background: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

.instructions {
    margin-top: 20px;
    font-size: 0.9em;
    color: #666;
    line-height: 1.6;
}

.instructions p {
    margin: 5px 0;
}

/* Mobile Controls Styles */
.mobile-controls {
    display: none;
    margin-top: 20px;
}

.d-pad-controls {
    width: 180px;
    height: 180px;
    margin: 0 auto;
    position: relative;
}

.d-pad {
    width: 100%;
    height: 100%;
    position: relative;
}

.d-pad-btn {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    -webkit-tap-highlight-color: transparent;
}

.d-pad-btn:active {
    transform: scale(0.95);
    background: #5a54a4;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.d-pad-btn.up {
    top: 0;
    left: 60px;
}

.d-pad-btn.down {
    bottom: 0;
    left: 60px;
}

.d-pad-btn.left {
    left: 0;
    top: 60px;
}

.d-pad-btn.right {
    right: 0;
    top: 60px;
}

.d-pad-middle {
    position: absolute;
    top: 60px;
    left: 0;
    width: 180px;
    display: flex;
    justify-content: space-between;
}

/* Touch Feedback Animation */
@keyframes touchRipple {
    0% {
        transform: scale(1);
        opacity: 0.4;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}

.touch-feedback {
    position: fixed;
    width: 40px;
    height: 40px;
    background: rgba(102, 126, 234, 0.6);
    border-radius: 50%;
    pointer-events: none;
    animation: touchRipple 0.4s ease-out;
}

/* Responsive Design */
@media (max-width: 500px) {
    .container {
        padding: 20px;
        margin: 10px;
    }

    h1 {
        font-size: 2em;
    }

    #gameCanvas {
        width: 300px;
        height: 300px;
    }

    .score-board {
        flex-direction: column;
        gap: 10px;
    }

    .controls button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 1em;
    }

    .mobile-controls {
        display: block;
    }

    .control-btn {
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
}

@media (max-width: 400px) {
    .container {
        padding: 15px;
        margin: 5px;
    }

    #gameCanvas {
        width: 280px;
        height: 280px;
    }
}

/* Game Over Modal Styles */
.game-over-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin: 15% auto;
    padding: 40px;
    border-radius: 20px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateY(-50px) scale(0.9);
        opacity: 0;
    }

    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}

.modal-content h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.game-over-details {
    margin: 20px 0;
}

.game-over-details p {
    font-size: 1.3em;
    margin: 10px 0;
    color: #fff;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    flex-wrap: wrap;
}

.modal-btn {
    padding: 15px 30px;
    font-size: 1.2em;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-btn.primary {
    background: #4CAF50;
    color: white;
}

.modal-btn.primary:hover {
    background: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.modal-btn.secondary {
    background: #f44336;
    color: white;
}

.modal-btn.secondary:hover {
    background: #da190b;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.modal-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Responsive modal for mobile */
@media (max-width: 500px) {
    .modal-content {
        margin: 20% auto;
        padding: 30px 20px;
        width: 95%;
    }

    .modal-content h2 {
        font-size: 2em;
    }

    .game-over-details p {
        font-size: 1.1em;
    }

    .modal-buttons {
        flex-direction: column;
        gap: 15px;
    }

    .modal-btn {
        width: 100%;
        max-width: 200px;
    }
}

/* Audio Controls */
.audio-controls {
    margin-top: 30px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.audio-controls h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.3em;
}

.audio-settings {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
}

.volume-control label {
    color: #333;
    min-width: 60px;
}

#volumeSlider {
    width: 150px;
    height: 5px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
}

#volumeSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
}

#volumeSlider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #667eea;
    border-radius: 50%;
    cursor: pointer;
    border: none;
}

#volumeValue {
    min-width: 40px;
    color: #667eea;
    font-weight: bold;
}

.audio-toggles {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.toggle-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 0.9em;
    color: #333;
}

.toggle-label input[type="checkbox"] {
    display: none;
}

.toggle-label .slider {
    position: relative;
    width: 50px;
    height: 25px;
    background: #ccc;
    border-radius: 25px;
    transition: 0.3s;
}

.toggle-label .slider:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2.5px;
    left: 2.5px;
    transition: 0.3s;
}

.toggle-label input[type="checkbox"]:checked+.slider {
    background: #667eea;
}

.toggle-label input[type="checkbox"]:checked+.slider:before {
    transform: translateX(25px);
}

.mute-button {
    background: #667eea;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 1.5em;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.mute-button:hover {
    background: #764ba2;
    transform: scale(1.1);
}

.mute-button.muted {
    background: #f44336;
}

/* Responsive audio controls */
@media (max-width: 500px) {
    .audio-controls {
        margin-top: 20px;
        padding: 15px;
    }

    .audio-settings {
        gap: 10px;
    }

    .volume-control {
        flex-direction: column;
        gap: 5px;
    }

    #volumeSlider {
        width: 120px;
    }

    .audio-toggles {
        flex-direction: column;
        gap: 10px;
    }
}

/* Add after existing mobile controls styles */
.control-toggle {
    text-align: center;
    margin-bottom: 15px;
}

.control-toggle button {
    background: #667eea;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.control-toggle button:hover {
    background: #5a54a4;
}

/* Swipe Controls */
.swipe-controls {
    width: 240px;
    height: 240px;
    margin: 0 auto;
    position: relative;
}

.swipe-area {
    width: 100%;
    height: 100%;
    background: rgba(102, 126, 234, 0.1);
    border: 2px dashed #667eea;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
}

.swipe-indicator {
    text-align: center;
    color: #667eea;
    font-size: 14px;
}

.swipe-arrow {
    font-size: 24px;
    margin-bottom: 10px;
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* Swipe Direction Indicator */
.swipe-direction {
    position: absolute;
    background: rgba(102, 126, 234, 0.2);
    border-radius: 10px;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.swipe-direction.active {
    background: rgba(102, 126, 234, 0.4);
}

@keyframes fadeUp {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(-20px);
    }
}
