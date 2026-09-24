varying vec2 vUv;

uniform sampler2D uDepthTexture;
uniform float uDepthStrength;

uniform vec2 uMouse;

void main() {

    vUv = uv;

    vec3 pos = position;

    float depth =
        texture2D(uDepthTexture, uv).r;

    pos.z += depth * uDepthStrength;

    pos.x += uMouse.x * depth * 0.25;
    pos.y += uMouse.y * depth * 0.15;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos, 1.0);
}