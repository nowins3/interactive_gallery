uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

    vec3 transformed = position;

    // WING WEIGHT
    float wingWeight = abs(position.x);

    // FLAPPING MOTION
    float flapSpeed = 5.0;

    // Slightly different phase at the tips.
    // This creates the "follow through" motion.
    float phase = uTime * flapSpeed - wingWeight * 0.4;
    float flap = sin(phase);


    // Maximum flap angle
    float angle = flap * 0.2 * wingWeight;

    // ROTATE WING
    float c = cos(angle);
    float s = sin(angle);

    float x = transformed.x;
    float y = transformed.y;

    transformed.x = x * c - y * s;
    transformed.y = abs(x) * s + y * c;


    // --------------------------------------------------
    // WORLD POSITION
    // --------------------------------------------------

    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);

    vPosition = worldPosition.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}