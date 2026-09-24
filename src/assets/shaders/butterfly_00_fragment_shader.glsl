uniform vec3 glowColor;
uniform float falloff;
uniform float glowSharpness;
uniform float glowInternalRadius;
uniform float opacity;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {

    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 1.0;
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = dot(viewDirection, normal);
    fresnel = pow(fresnel, glowInternalRadius + 0.1);
    float falloff = smoothstep(0., falloff, fresnel);
    float fakeGlow = fresnel;
    fakeGlow += fresnel * glowSharpness;
    fakeGlow *= falloff;
    gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., opacity));

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}