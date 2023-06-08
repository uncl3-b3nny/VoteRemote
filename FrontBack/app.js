const express = require('express');
const bodyParser = require('body-parser');
const { verifyCredential } = require('@spruceid/didkit-wasm-node');

const ejs = require('ejs');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

let voteCount = 0;
let yesCount = 0;
let noCount = 0;


app.get('/vote/count', (req, res) => {
  res.json({ count: voteCount, yesCount, noCount });
});

app.post('/vote', async(req, res) => {
  const {credential,voteValue} = req.body;
  const proof= JSON.stringify({
    verificationMethod:"did:key:z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV#z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV",
    proofPurpose: 'authentication',
    created: new Date().toISOString(),
    challenge: '123',
    domain: 'example.com',
  });
  let validPizzaLover;

  try{
    const verify = await verifyCredential(credential, proof);
    if(JSON.parse(verify).errors.length > 0)throw new Error();
    console.log("You are really a pizza lover, Your vote will be counted!")
    validPizzaLover= true
  }catch(err){
    console.log("Go away!")
    validPizzaLover= false
  }
  if (!validPizzaLover){ res.json({ value: 0 })} else {
    if (voteValue === 'yes') {
      yesCount++;
    } else if (voteValue === 'no') {
      noCount++;
    }  
  voteCount++;
  res.json({ message: 'Vote counted!' });}
});

app.get('/', (req, res) => {
  res.render('index', { voteCount });
});
app.use(express.static(__dirname+'/public'));

app.listen(3000, () => {
  console.log('Voting application server is running on port 3000');
});
