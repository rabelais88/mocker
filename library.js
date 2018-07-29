function hr(...argv){
  if(argv.length > 0){
    console.log(argv[0].repeat(60))
  } else {
  console.log('-'.repeat(60))
  }
}

const CORSheader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': ['*'],
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

function rand(...argv){
  let min = 0,
      max = 100
  if(argv.length === 1){
    max = argv[0]
  }else if(argv.length >= 2){
    min = argv[0]
    max = argv[1]
  }
  return Math.floor((Math.random() * max) + min)
}

function aryPick(ary){
  return ary[rand(ary.length)]
}

exports.hr = hr
exports.rand = rand
exports.CORSheader = CORSheader
exports.aryPick = aryPick