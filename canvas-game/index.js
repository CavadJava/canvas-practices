const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius,
            0, Math.PI * 2, false)
            c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update () {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update () {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width/2
const y = canvas.height/2
const player = new Player(x, y, 30, 'blue')

console.log(player)

const projectiles = []
const enemies = []

function spawnEnemies(){
    setInterval(()=> {
        const radius = 30;

        let x,y
        
        if(Math.random()<0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        }
        else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = 'green';
        const angle = Math.atan2(
            canvas.height/2 - y,
            canvas.width/2 - x
        )
        const velocity = {
            x:Math.cos(angle),
            y:Math.sign(angle)
        }
        // alert("x:"+x+"y:"+y+
        // "\ncanvas.height:"+canvas.height+"canvas.width:"+canvas.width+
        // "\ncanvas.height/2:"+canvas.height/2+"canvas.width:"+canvas.width/2+
        // "angle:"+angle+
        // "\nMath.cos(angle):"+Math.cos(angle)+"Math.sign(angle):"+Math.sign(angle))
        enemies.push(new Enemy(x, y, radius, color, velocity))
    },1000);
}

function animate() {

    requestAnimationFrame(animate)
    c.clearRect(0,0,canvas.width,canvas.height)
    player.draw()
    projectiles.forEach((projectile)=>{
        projectile.update()
    })
    enemies.forEach((enemy)=>{
        enemy.update()
    })
}

window.addEventListener('click', (event)=>{
    const angle = Math.atan2(
        event.clientY - canvas.height/2,
        event.clientX - canvas.width/2
    )
    const velocity = {
        x:Math.cos(angle),
        y:Math.sign(angle)
    }
    console.log(angle)
    const projectile = new Projectile(
        canvas.width/2,
        canvas.height/2,
        5, 'red', velocity
    )    
    projectiles.push(projectile)
})
animate()
spawnEnemies()