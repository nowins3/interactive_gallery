uniform sampler2D _mainTex;
uniform vec2 _centre;
uniform float _scale;
uniform float _radius;

varying vec2 vUv;        

void main() {           
    
    vec2 uv = vUv; 
    vec2 centre = _centre * 0.51 + vec2(0.5, 0.5);
    
    uv = uv - centre;
    float buldgeDist = smoothstep(clamp(_scale, -1.0, _radius), _radius, distance(centre, vUv));
    uv = uv * buldgeDist + centre;

    uv = uv * 2.0 - 0.5;
    vec4 mainCol = texture2D(_mainTex, uv);
    
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        discard;
    }

    gl_FragColor = mainCol;
}