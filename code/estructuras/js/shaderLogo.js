#include <common>

uniform vec2 mousePos;
uniform float mouseSize;
uniform float viscosityConstant;

#define deltaTime (1.0 / 60.0)
#define GRAVITY_CONSTANT (resolution.x * deltaTime * 3.0)

const vec2 ONE = vec2(1.0);

void main()   {
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 uv = gl_FragCoord.xy * cellSize;

  // heightmapValue.x == height
  // heightmapValue.y == velocity
  // heightmapValue.z, heightmapValue.w not used
  vec4 heightMapValue = texture2D( heightMap, uv );

  // Get neighbours
  vec4 north = texture2D(heightMap, mod(uv + vec2(0.0, cellSize.y), ONE));
  vec4 south = texture2D(heightMap, mod(uv + vec2(0.0, -cellSize.y), ONE));
  vec4 east = texture2D(heightMap, uv + vec2(cellSize.x, 0.0));
  vec4 west = texture2D(heightMap, uv + vec2(-cellSize.x, 0.0));

  float sump = north.x + south.x + east.x + west.x - 4.0 * heightMapValue.x;
  float accel = sump * GRAVITY_CONSTANT;

  // Dynamics
  heightMapValue.y += accel;
  heightMapValue.x += heightMapValue.y * deltaTime;

  // Viscosity
  heightMapValue.x += sump * viscosityConstant;

  // Mouse influence
  float mousePhase = clamp(length((uv - vec2(0.5)) * BOUNDS - vec2(mousePos.x, -mousePos.y)) * PI / mouseSize, 0.0, PI);
  heightMapValue.x += cos(mousePhase) + 1.0;

  gl_FragColor = heightMapValue;
}