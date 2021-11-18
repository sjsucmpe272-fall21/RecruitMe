const FormattedJobData = require("../Models/FormattedJobData");
var natural = require('natural');
var TfIdf = natural.TfIdf;
const Vector = require('vector-object');

const createVectors = (formattedJobs)=>{
    const tfidf = new TfIdf();

    formattedJobs.forEach(formattedJobs => {
        tfidf.addDocument(formattedJobs.formattedData);
      });

    const documentVectors = [];

    for (let i = 0; i < formattedJobs.length; i += 1) {
        const processedDocument = formattedJobs[i];
        const obj = {};
    
        const items = tfidf.listTerms(i);
    
        for (let j = 0; j < items.length; j += 1) {
          const item = items[j];
          obj[item.term] = item.tfidf;
        }
    
        const documentVector = {
          id: processedDocument.id,
          vector: new Vector(obj)
        };
    
        documentVectors.push(documentVector);
      }
      return documentVectors;
}

const getFormattedJobs =  ()=>{
     return FormattedJobData.find()
    .exec()
    .then((formattedJobs) => {
        return formattedJobs;
    })
    .catch(error=>{
        return {
            error: "No Job Found "+error
        };
    })
}

const calcSimilarities = docVectors => {
    // number of results that you want to return.
    const MAX_SIMILAR = 20; 
    // min cosine similarity score that should be returned.
    const MIN_SCORE = 0.2;
    const data = {};
  
    for (let i = 0; i < docVectors.length; i += 1) {
      const documentVector = docVectors[i];
      const { id } = documentVector;
  
      data[id] = [];
    }
  
    for (let i = 0; i < docVectors.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        const idi = docVectors[i].id;
        const vi = docVectors[i].vector;
        const idj = docVectors[j].id;
        const vj = docVectors[j].vector;
        const similarity = vi.getCosineSimilarity(vj);
        console.log(similarity);
        if (similarity > MIN_SCORE) {
          data[idi].push({ id: idj, score: similarity });
          data[idj].push({ id: idi, score: similarity });
        }
      }
    }
  
    // finally sort the similar documents by descending order
    Object.keys(data).forEach(id => {
      data[id].sort((a, b) => b.score - a.score);
  
      if (data[id].length > MAX_SIMILAR) {
        data[id] = data[id].slice(0, MAX_SIMILAR);
      }
    });
  
    return data;
}


// exports.getSimilarDocuments = (id, trainedData) => {
//     let similarDocuments = trainedData[id];
  
//     if (similarDocuments === undefined) {
//       return [];
//     }
  
//     return similarDocuments;
//   };

exports.getSimilarJobs = async (req,res)=>{
    var formattedJobs =  await getFormattedJobs();
    const documentVectors = createVectors(formattedJobs);
    const trainedData = calcSimilarities(documentVectors);
    let similarDocuments = trainedData[req.body.id];
  
    if (similarDocuments === undefined) {
      return [];
    }
  
    return res.json(similarDocuments);
}