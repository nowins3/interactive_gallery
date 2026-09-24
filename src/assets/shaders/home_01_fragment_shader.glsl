varying vec2 vUv;

uniform sampler2D uColorTexture;

void main() {

    vec4 color = texture2D(uColorTexture, vUv);

    gl_FragColor = color;
}