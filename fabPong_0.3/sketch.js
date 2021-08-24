//som do jogo
let trilha;
let raquete;
let mesa;
let ponto;


//variáveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 20;
let raio = diametro / 2;
let posicao = [50,100,150,200,250,300,350];

//movimento da bola
let xV = 7;
let yV = xV;
let direcao = [xV,xV*-1];
let colidiu = false;

//variáveis da Raquete do Jogador
let xRaquete1 = 5;
let yRaquete1 = 160;
let wRaquete = 10;
let hRaquete = 70;


//variáveis da Raquete do Oponente
let xRaquete2 = 580;
let yRaquete2 = 160;
let rV = [xV+1,xV,xV-1];

//placar jogo
let pontoR1 = 0;
let pontoR2 = 0;



function preload(){
  trilha = loadSound("trilha.mp3");
  raquete = loadSound("raquete.mp3");
  mesa = loadSound("mesa.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  inicio();
  trilha.loop();
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2)
  line(300, 0, 300, 400);
  mostrabola();
  mostraraquete(xRaquete1,yRaquete1);
  mostraraquete(xRaquete2,yRaquete2);
  movebola();
  moveraquete1();
  moveraquete2();
  colisaoBorda();
  colisaoRaquete(xRaquete1,yRaquete1);
  colisaoRaquete(xRaquete2,yRaquete2);
  placar();
}

function inicio(){
    xBola = 300; 
  //deixa a posição e direção inicial da bolinha aleatória
    yBola = random(posicao);
    xV = random(direcao);
    yV = random(direcao);
}

function mostrabola(){
  circle(xBola, yBola, diametro);
}

function mostraraquete(x,y){
  rect(x, y, wRaquete, hRaquete);
}

function movebola(){
  xBola += xV;
  yBola += yV;
}

function moveraquete1(){
  yRaquete1 = mouseY;
}

function moveraquete2(){
  //faz com que a raquete 2 só se mexa quando a bolinah está na sua mesa e indo em sua direção
  if (xBola > 300 && xV > 0){
    //faz com que a raquete se mova de forma realista e com velocidade variável para a bolinha em vez de se teletransportar
    if (yRaquete2 != yBola){
      if (yRaquete2 < yBola){
        yRaquete2 += random(rV);
      }
      else{
        yRaquete2 += random(rV) * -1;
      }
    }
  }
  
}

function colisaoBorda(){
  if (xBola + raio > width){
    pontoR1 += 1;
    inicio();
    ponto.play();
  }
  if (xBola - raio < 0){
    pontoR2 += 1;
    inicio();
    ponto.play();
  }
  if (yBola + raio > height || yBola - raio < 0){
    yV *= -1;
    mesa.play();
  }
  
}

function colisaoRaquete(x,y){
   colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBola, yBola, raio + 2);
    if (colidiu) {
      xV *= -1;
      raquete.play();
    }
}

function placar(){
  fill(255);
  textSize(50);
  textFont('Helvetica');
  text(pontoR1, 250, 50);
  text(pontoR2, 321, 50);
}