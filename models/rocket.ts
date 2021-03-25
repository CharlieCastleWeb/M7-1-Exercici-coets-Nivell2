class Rocket {
    code:string;
    engines:number[]=new Array();
    position:number;

    constructor(code:string,engines:number[], position:number) {
        this.code = code;
        this.engines = engines;
        this.position = 0;
    }
    
    printRocket() {
        let showRocket:string = `
            <p>Rocket ${this.code} boosters max power ${this.engines}</p>
        `
    }

}