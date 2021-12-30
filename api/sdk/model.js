const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // x & y
     x1 = (data[0] - 42.794) / 10.60339549
    x2 = (data[1] - 88.509) / 19.06251028  
    return [x1,x2]
}

function denormalized(data){
    y1 = (data[0] * 9.20165319) + 74.807
    y2 = (data[1] * 14.85172777) + 49.766
    return [y1,y2]
}


async function predict(data){
    let in_dim = 2;
    
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
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
