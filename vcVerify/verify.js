
const { verifyCredential } = require('@spruceid/didkit-wasm-node');
const { generateEd25519Key, issueCredential ,keyToDID,keyToVerificationMethod} = require('@spruceid/didkit-wasm-node');
async function verify(input) {
//     const keyResult1 = generateEd25519Key();
//     const key =  keyResult1.replace('\n', '');
  
//     const didResult = keyToDID("key", key);
//     const did = didResult.replace('\n', '');
  
//     console.log('Generated DID:', did);
//     const verificationMethod = await keyToVerificationMethod('key', key);

// console.log(verificationMethod)
//   const credential = JSON.stringify({
//     '@context': 'https://www.w3.org/2018/credentials/v1',
//     id: 'https://example.com/credentials/123',
//     type: ['VerifiableCredential','PizzaLover'],
//     issuer: did,
//     issuanceDate: new Date().toISOString(),
//     credentialSubject: {
//       id: 'did:example:abc',
//     },
//   });

const proof2 = JSON.stringify({
    verificationMethod:"did:key:z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV#z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV",
    proofPurpose: 'authentication',
    created: new Date().toISOString(),
    challenge: '123',
    domain: 'example.com',
  });
// let proofResult;
//   try{
//    proofResult = await issueCredential(credential,proof2,key);
//   console.log(proofResult)
//   }catch(err){
// console.log(err);
//   }
  let validPizzaLover;

  try{
    const verify = await verifyCredential(JSON.stringify(input), proof2);
    if(verify.errors.length > 0)throw new Error();
    console.log("You are really a pizza lover, Your vote will be counted!")
    validPizzaLover= true
  }catch(err){
    console.log("Go away!")
    validPizzaLover= false
  }

//   return validPizzaLover;
//   const verifiableCredential = proofResult.credential;
//   const proof = proofResult.proof;

//   console.log('Issued Credential:', verifiableCredential);
//   console.log('Proof:', proof);

// Signing the credential - using of the packages - keypair of 

// verify - proof -> verification Method - > did -> resolve - > publicKeyMultibase -> verify


}

verify({"@context":"https://www.w3.org/2018/credentials/v1","id":"https://example.com/credentials/123","type":["VerifiableCredential","FakePizzaLover"],"credentialSubject":{"id":"did:example:abc"},"issuer":"did:key:z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV","issuanceDate":"2023-06-08T20:14:31.606Z","proof":{"type":"Ed25519Signature2018","proofPurpose":"authentication","challenge":"123","verificationMethod":"did:key:z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV#z6MkhruyBBBUmoMCJW6WABjHfULt4eHCP6c1yiLGufdFV1bV","created":"2023-06-08T20:14:31.606Z","domain":"example.com","jws":"eyJhbGciOiJFZERTQSIsImNyaXQiOlsiYjY0Il0sImI2NCI6ZmFsc2V9..4ooUub9tKHGl-dasdsadas"}});