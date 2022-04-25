const express = require('express');
const router = express.Router();
const {SCRIPT_LOCATION} = require('../modules/config');

router.get('/', async (req, res) => {
  try {
    let output = '';
    var spawn = require('child_process').spawn,child;
    child = spawn("powershell.exe",[SCRIPT_LOCATION]);
    child.stdout.on("data", (data) => {
      output += data;
      console.log("Powershell Data: " + data);
    });
    child.stderr.on("data", (data) => {
      console.log("Powershell Errors: " + data);
      res.status(202).json({ msg:'Failure', response: `There was a problem: ${data}`});
    });
    child.on("exit", () => {
      console.log("Powershell Script finished");
      res.status(200).json({ msg:'Success', response: `The file as been de-identified (${output}).` });
    });
    child.stdin.end(); //end input
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request', response: err});
  }
});

module.exports = router;