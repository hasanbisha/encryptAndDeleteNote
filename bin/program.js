#!/usr/bin/env node

const cryptr = require("cryptr");
const fs = require("fs");
const program = require('commander');
const { exec } = require("child_process");
const colors = require('colors');

const readFile = async (file) => {
    return fs.readFileSync(file, "utf8");
}

const hashData = async (data) => {
	const Encrypter = new cryptr("foryoureyezonly");
	return Encrypter.encrypt(data);
}

const secureNote = (file) => {
	fs.unlink(`./note.txt`, (error) => {
		if(error) throw error;

		console.log("Note secured...");
	});
}

const writeHashToFile = async file => {
	const currentTime = Date.now();
	const data = await readFile(file);
	const hashedData = await hashData(data);

	fs.writeFile(`./notes/${currentTime}.txt`, hashedData, "utf8", (error) => {
		if(error) throw error;

		console.log(`${currentTime} notes written`);
	});

	secureNote(file);
}

program
    .command('hash <file>') // sub-command name, coffeeType = type, required
    .alias('h') // alternative sub-command is `o`
    .description('Hash the fuck out of the file') // command description
    // .option('-s, --sugar [value]', 'Sugar level', "Low") // args.sugar = value, optional, default is 'Low'
    // .option('-d, --decaf', "Decaf coffee") // args.decaf = true/false, optional, default is `undefined`
    // .option('-S, --served-in [value]', "Served in", "Mug") // args.servedIn = value, optional, default is 'Mug'
    // .option('--no-stirrer', 'Do not add stirrer') // args.stirrer = true/false, optional, default is `true`

    // function to execute when command is uses
    .action((file, args) => {
        console.log(file);
        console.log("cat", file);
        exec("pwd", (err, stdout, stderr) => {
            if (err) {
              console.log(err);
            } else {
            //   console.log({ stdout, stderr });
                const filePath = stdout.replace("\n", "/") + file;
                writeHashToFile(filePath);
            }
        });
        // console.log("YOUR ORDER");
        // console.log('------------------');

        // console.log('Coffee type is %s', colors.green(coffeeType));
        // console.log('args.sugar %s', colors.green(args.sugar));
        // console.log('args.decaf %s', colors.green(args.decaf));
        // console.log('args.cold %s', colors.green(args.cold));
        // console.log('args.servedIn %s', colors.green(args.servedIn));
        // console.log('args.stirrer %s', colors.green(args.stirrer));
    });


// allow commander to parse `process.argv`
program.parse(process.argv);

// writeHashToFile();

// cool shit happened i guess
// hanged with hysen n nikki, talked about cool shit
// hysen told me about some interesting thins
// also the raspberry will be coming in a couple of weeks so yaay
// really fucked up from the nikki stuff
// i dont know what the fuck is going to happen, but i just want to make him great
