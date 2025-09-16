
# 👁️‍🗨️ **FaceGuard: Real-Time Face Recognition & Animation Portal**

> A secure, creative browser-based face recognition system with visual authentication feedback and an animated reward experience.

---

## Overview

**FaceGuard** is a full-featured browser application that leverages face recognition, real-time edge detection, and p5.js graphics to authenticate users securely and playfully. Upon successful identity confirmation using the webcam, users are welcomed with a rotating 3D shader-based animation sphere. Unauthorized attempts trigger alerts and visual warnings.

The system enhances the face recognition pipeline with edge-based validation using Sobel filters, ensuring the face input quality is high before proceeding to match. The app is a creative blend of security, computer vision, and interactive design built entirely with JavaScript and WebGL.

---

## Demo
![image](https://github.com/user-attachments/assets/07bfb8c0-db8a-473d-a52d-965037f06aaf)


## Features

* **Real-Time Face Recognition**
  Uses `face-api.js` to detect and match faces from live webcam input.

* **Edge Detection Verification**
  Verifies image brightness and clarity using Sobel edge detection before confirming faces.

* **Dynamic 3D Shader Animation**
  Successful login transitions to a rotating shader sphere powered by GLSL and WebGL.

* **Interactive Firework Text Display**
  Click toggles to a fireworks and message canvas for a celebratory effect.

* **Authentication Feedback Alerts**
  Provides instant visual and textual feedback on recognition success or failure.

* **Browser-Based with Zero Backend**
  Runs fully on client side using HTML, JavaScript, p5.js, and GLSL shaders.

----

## Algorithms and Design Choices
**1. Face Detection**
* **SSD Mobilenet V1**
 High accuracy and robustness to varied lighting and angles. Chosen over Viola–Jones due to better generalization across modern datasets.

* **Tiny Face Detector**
 Optimized for low-latency performance. Used on devices with limited compute at a slight cost to accuracy.
 Trade-off: SSD offers higher precision; Tiny Face Detector improves speed for resource-limited contexts.

**2. Face Recognition**

* Uses 128-dimensional embeddings generated via CNNs.

* Recognition performed by comparing Euclidean distance between embeddings.

* Threshold tuning balances false acceptance rate (FAR) vs. false rejection rate (FRR).

**3. Anti-Spoofing**

* Sobel operator computes intensity gradients to detect depth cues.

* Rejects flat 2D images lacking sufficient texture contrast.

* Trade-off: Computationally lightweight but less robust against advanced 3D masks.

**4. Graphics Integration**

* GLSL shaders render a rotating sphere for successful login, emphasizing GPU acceleration through WebGL.

* p5.js handles 2D effects like celebratory fireworks.

Trade-off: Shader effects are resource-intensive but showcase seamless GPU-accelerated feedback.
---

## Tech Stack

| Layer                            | Technologies                          |
| -------------------------------- | ------------------------------------- |
| **Frontend**                     | HTML5, JavaScript, CSS                |
| **Graphics & Animation**         | p5.js, WebGL, GLSL shaders            |
| **Face Detection & Recognition** | face-api.js                           |
| **Edge Detection**               | Custom convolution with Sobel filters |
| **UI Feedback**                  | DOM + Canvas + Alerts                 |

---

## Folder Structure

```
.
├── index.html              # Entry page with buttons for login/signup
├── logger.html             # Face recognition page
├── animation.html          # Animation post-authentication
├── sketch.js               # p5.js logic
├── face-detection.js       # Core face recognition logic
├── shader.frag             # Fragment shader
├── shader.vert             # Vertex shader
├── style.css               # CSS styles
├── /models                 # face-api.js models
├── /labels                 # Known face images for recognition
```

---

## Setup & Installation

### 1. Clone the Repo

```bash
git clone https://github.com/kmb21/faceguard.git
cd faceguard
```

### 2. Serve Locally (for webcam and model access)

Use any static file server. For example:

```bash
# Using Python 3
python -m http.server 8000
```

Then open `http://localhost:8000/index.html` in your browser.

> Ensure camera access is allowed in your browser.

---

## Configuration

Place labeled images in the `labels/` folder under subfolders named by person (e.g., `labels/Maxwell/1.png`, `labels/Maxwell/2.png`).

Ensure the `models/` directory contains:

* `ssdMobilenetv1_model-shard1`
* `face_landmark_68_model`
* `face_recognition_model`

You can download them from [face-api.js model repository](https://github.com/justadudewhohacks/face-api.js-models).

---

## How It Works

1. **User enters the login portal**
2. Webcam captures video stream
3. `face-api.js` detects and encodes the face
4. Before recognition, a **Sobel edge detection** ensures facial clarity
5. If validated, the match is attempted
6. On **success**: name is confirmed and animation launches
7. On **failure**: alert messages are displayed, and after repeated unknowns, security snapshot is triggered

---

## Testing Tips

* Use multiple labeled images per person for better recognition accuracy
* Bright lighting improves edge and face detection
* Refresh browser permissions if webcam access fails

---

##Contribution Guide

1. Fork the repo
2. Create a new branch: `feature/my-feature`
3. Commit your changes: `git commit -m 'Add awesome feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgments

* [face-api.js](https://github.com/justadudewhohacks/face-api.js)
* [p5.js](https://p5js.org/)
* [The Book of Shaders](https://thebookofshaders.com/)
* Fonts from Google Fonts

