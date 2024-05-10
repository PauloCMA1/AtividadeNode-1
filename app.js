const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

//configurar EJS como mecanismo de visualização
app.set('view engine', 'ejs'); // extensão dos arquivos
app.set('views', __dirname + '/views'); //onde estão os arquivos

//configurar o estilo que esta na public
app.use(express.static('public'));

//configurar bodyParser do formulario
app.use(bodyParser.urlencoded({extended: true}));

//simular um banco de dados
const produtos = [
    {
        id:1,
        nome: 'Iphone',
        preco: 1000,
        categoria: 'eletronicos'
    },
    {
        id:2,
        nome: 'Samsung A3',
        preco: 100,
        categoria: 'eletronicos'
    },
    {
        id:3,
        nome: 'Guarda-roupa',
        preco: 1500,
        categoria: 'movel'
    },
    {
        id:4,
        nome: 'Cama',
        preco: 150,
        categoria: 'movel'
    },
    {
        id:5,
        nome: 'Camisa',
        preco: 15,
        categoria: 'roupa'
    },
    {
        id:6,
        nome: 'Calça',
        preco: 20,
        categoria: 'roupa'
    },
    {
        id:7,
        nome: 'Geladeira',
        preco: 120,
        categoria: 'eletrodomestico'
    },
    {
        id:8,
        nome: 'Fogão',
        preco: 120,
        categoria: 'eletrodomestico'

    },
];

//rota principal 
app.get('/', (req, res) => {

    const {categoria} = req.query
    let p = produtos
    if(categoria){
        p = p.filter(produto => produto.categoria === categoria)
        
    }
    res.render('index', {p})
    
})

// app.get('/', (req, res) =>{
//     const {categoria} = req.query
//     if(categoria){
//         produtos = produtos.filter(produto => produto.categoria === categoria)
//     }
//     res.render('index', {produtos})
// })

//rota para exibir uma postagem individual
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const produto = produtos.find(produto => produto.id === parseInt(id));
    res.render('products', {produto});
})

//rota para adicionar uma postagem
app.get('/add', (req, res) => {
    res.render('add');
})

// Rota para processar o formulário
app.post('/add', (req, res) => {
    const {nome,preco,categoria} = req.body;
    const id = produtos.length + 1;
    produtos.push({id, nome, preco, categoria});
    res.redirect('/'); 
})

//subir servidor
app.listen(port, () =>{
    console.log('Servidor rodando na porta', port)
})