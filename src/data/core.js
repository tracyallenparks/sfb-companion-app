const d6 = (max=6,min=1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
};

const rollDice = (count) => {
    let numbers = [];
    while (numbers.length < count) {
        const roll1 = d6();
        const roll2 = d6();
        numbers.push({total:roll1+roll2,d1:roll1,d2:roll2});
    }
    return [...numbers];
};

const terms = { ae:'Any Warp Engine', ah:'Aft Hull', ar:'APR', aw:'Any Weapon', ax:'Auxillary Control', ba:'Battery', br:'Bridge', co:'Cargo', cw:'Center Warp Engine', dc:'Damage Control', dr:'Drone', eb:'Emergency Bridge', fb:'Flag Bridge', fh:'Forward Hull', ip:'Impulse', lb:'Lab', lw:'Left Warp Engine', ph:'Phaser', pr:'Probe', rw:'Right Warp Engine', sc:'Scanner', se:'Sensor', sh:'Shuttle', tp:'Torpedo', tc:'Tractor', ts:'Transporter', xd:'Excess Damage', t:{con:'control', wpn:'weapon',pwr:'power',sup:'superstructure',sys:'system'} };

const cards = [
    //structure is { nm: '%RESULT NAME%', ty: '%INTERNAL TYPE%', uq: '%IS THIS UNIQUE OR NOT%', by: '%NEED TO BYPASS%}
    //0 never a result from 2D6
    null,
    //1 never a result from  2D6
    null,
    //2
    [
        { nm: terms.br, ty:terms.t.con, uq: 1, by: 0 },
        { nm: terms.fb, ty:terms.t.con, uq: 1, by: 0 },
        { nm: terms.se, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.dc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 1, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //3
    [
        { nm: terms.dr, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.dc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.cw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //4
    [
        { nm: terms.ph, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ar, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.cw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //5
    [
        { nm: terms.rw, ty:terms.t.pwr, uq: 1, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.co, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.tp, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.aw, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //6
    [
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.se, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.aw, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //7
    [
        { nm: terms.co, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.cw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ar, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.ae, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.aw, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //8
    [
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ar, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.sc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.aw, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //9
    [
        { nm: terms.lw, ty:terms.t.pwr, uq: 1, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.co, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.dr, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.aw, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //10
    [
        { nm: terms.ph, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ar, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.cw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //11
    [
        { nm: terms.tp, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 1, by: 0 },
        { nm: terms.ip, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.dc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.cw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ba, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ph, ty:terms.t.wpn, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ],
    //12
    [
        { nm: terms.ax, ty:terms.t.con, uq: 1, by: 0 },
        { nm: terms.eb, ty:terms.t.con, uq: 1, by: 0 },
        { nm: terms.sc, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.pr, ty:terms.t.sys, uq: 1, by: 0 },
        { nm: terms.fh, ty:terms.t.sup, uq: 1, by: 0 },
        { nm: terms.rw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.ts, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.sh, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.tc, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.lb, ty:terms.t.sys, uq: 0, by: 0 },
        { nm: terms.ah, ty:terms.t.sup, uq: 0, by: 0 },
        { nm: terms.lw, ty:terms.t.pwr, uq: 0, by: 0 },
        { nm: terms.xd, ty:terms.t.sys, uq: 0, by: 0 }
    ]
];

export { rollDice, cards };