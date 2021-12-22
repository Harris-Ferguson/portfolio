# Portfolio Site
A portfolio site I created. 

# Building
run `npm run start` to run the server, and connect at `localhost:3000`.

# The Graphic
On the landing page background there is a graphic which looks like a bunch of colors bleeding 
down the screen. I created this effect by creating a 3D [Simplex Noise](https://en.wikipedia.org/wiki/Simplex_noise) field, and taking samples of the z-axis of this noise field at specific points. After sampling the noise field, the resulting value is used as a constant term in sum that calculates 
the angle a point in the field should rotate on the next animation frame. 
