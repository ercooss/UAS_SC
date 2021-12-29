const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    x1 = (data[0] - 42.794) / 10.60339549
    x2 = (data[1] - 88.509) / 19.06251028
    x3 = (data[2] - 143.127) / 22.86503183
    y1 = (data[3] - 74.807) / 9.20165319
    y2 = (data[4] - 49.766) / 14.85172777
    y3 = (data[5] - 160.133) / 23.85217469
    return [x1,x2,x3,y1,y2,y3]
}


const argFact = (compareFn) => (array) => array.map((el,idx) => [el,idx]).reduce(compareFn)[1]
const argMax  = argFact((min,el) => (el[0] > min[0] ? el : min))

function ArgMax(res){
  label = "NORMAL"
  cls_data = []
  for(x1=0; x1<res.length; x1++){
    cls_data [x1] = res[x1]
  }
  console.log(cls_data , argMax(cls_data));
  
  if(argMax(cls_data) == 1){
    label = "OVER"
  }if(argMax(cls_data)==0){
      label = "DROP"
    }
    return label
  }


async function classify(data){
    let in_dim = 6; //i r v p
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/ercooss/UAS_SC/main/public/dnn_model/model.json';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return ArgMax( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    classify: classify 
}
