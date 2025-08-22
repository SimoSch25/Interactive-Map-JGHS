const backBtn = document.getElementById('backBtn');
const searchBtn = document.getElementById('searchBtn');
const mapBtn = document.getElementById('mapBtn');
const archiveBtn = document.getElementById('archiveBtn');
const addEquipmentBtn = document.getElementById('addEquipmentBtn');
const contentArea = document.getElementById('content-area');
const mapDiv = document.getElementById('map');
const addEquipmentModal = document.getElementById('addEquipmentModal');
const closeAddEquipmentModal = document.getElementById('closeAddEquipmentModal');
const addEquipmentForm = document.getElementById('addEquipmentForm');
const selectLocation = document.getElementById('selectLocation');
const dynamicContainer = document.getElementById('dynamicContainer');
const dynamicLabel = document.getElementById('dynamicLabel');
const selectDynamic = document.getElementById('selectDynamic');
const subDynamicContainer = document.getElementById('subDynamicContainer');
const subDynamicLabel = document.getElementById('subDynamicLabel');
const selectSubDynamic = document.getElementById('selectSubDynamic');
const equipmentNameInput = document.getElementById('equipmentName');
const equipmentQuantityInput = document.getElementById('equipmentQuantity');
const confirmModal = document.getElementById('confirmModal');
const confirmModalTitle = document.getElementById('confirmModalTitle');
const confirmModalMessage = document.getElementById('confirmModalMessage');
const confirmModalConfirmBtn = document.getElementById('confirmModalConfirmBtn');
const confirmModalCancelBtn = document.getElementById('confirmModalCancelBtn');

let navigationStack = [];
let pendingAction = null;

const equipmentData = {
    'Lab 1': {
        cabinets: {
            'Cupboard A': [{ name: 'Beakers (100ml)', qty: 50 }, { name: 'Conical Flasks (250ml)', qty: 30 }],
            'Cupboard B': [{ name: 'Pipettes (10ml)', qty: 15 }, { name: 'Measuring Cylinders (50ml)', qty: 20 }],
            'Cupboard C': [{ name: 'Stirring Rods', qty: 40 }],
            'Cupboard D': [{ name: 'Filter Paper packs', qty: 10 }],
            'Cupboard E': [{ name: 'Spatulas', qty: 25 }],
            'Cupboard F': [{ name: 'Crucibles', qty: 12 }]
        }
    },
    'Lab 2': {
        cabinets: {
            'Cupboard A': [{ name: 'Microscope Slides', qty: 100 }, { name: 'Cover Slips', qty: 100 }],
            'Cupboard B': [{ name: 'Syringes (various sizes)', qty: 20 }, { name: 'Needles', qty: 50 }],
            'Cupboard C': [{ name: 'Parafilm', qty: 5 }],
            'Cupboard D': [{ name: 'Dissecting Kits', qty: 8 }],
            'Cupboard E': [{ name: 'Forceps', qty: 30 }],
            'Cupboard F': [{ name: 'Scalpels (disposable)', qty: 50 }]
        }
    },
    'Lab 3': {
        cabinets: {
            'Cupboard A': [{ name: 'Reagent Bottles (100ml)', qty: 20 }, { name: 'Wash Bottles', qty: 15 }],
            'Cupboard B': [{ name: 'Volumetric Flasks (250ml)', qty: 10 }, { name: 'Burettes', qty: 8 }],
            'Cupboard C': [{ name: 'Indicators (pH)', qty: 7 }],
            'Cupboard D': [{ name: 'Buffer Solutions', qty: 10 }],
            'Cupboard E': [{ name: 'Test Tube Racks', qty: 15 }],
            'Cupboard F': [{ name: 'Funnels', qty: 20 }]
        }
    },
    'Lab 4': {
        cabinets: {
            'Cupboard A': [{ name: 'Condensers', qty: 5 }, { name: 'Receiving Flasks', qty: 10 }],
            'Cupboard B': [{ name: 'Separatory Funnels', qty: 5 }, { name: 'Round Bottom Flasks (250ml)', qty: 15 }],
            'Cupboard C': [{ name: 'Kjeldahl Flasks', qty: 6 }],
            'Cupboard D': [{ name: 'Reflux Condensers', qty: 4 }],
            'Cupboard E': [{ name: 'Glass Stoppers', qty: 50 }],
            'Cupboard F': [{ name: 'Rubber Tubing', qty: 20 }]
        }
    },
    'Lab 5': {
        cabinets: {
            'Cupboard A': [
                { name: '2 x 5kg weighing scales', qty: 2 },
                { name: '7 x joule meters', qty: 7 }
            ]
        }
    },
    'Lab 6': {
        cabinets: {
            'Cupboard A': [
                { name: 'Loudspeakers', qty: 5 },
                { name: 'Ruben’s tube', qty: 5 },
                { name: 'Ramps', qty: 5 },
                { name: 'PCR Tubes', qty: 1000 },
                { name: 'PCR Plates', qty: 50 }
            ],
            'Cupboard B': [{ name: 'Agarose', qty: 5 }, { name: 'TAE Buffer', qty: 10 }],
            'Cupboard C': [{ name: 'DNA Ladders', qty: 5 }],
            'Cupboard D': [{ name: 'Ripple tank', qty: 5 }],
            'Cupboard E': [{ name: 'Power Supplies (electrophoresis)', qty: 2 }],
            'Cupboard F': [{ name: 'Gel Combs', qty: 10 }]
        }
    },
    'Lab 7': {
        cabinets: {
            'Cupboard A': [
                { name: 'Oscilloscopes', qty: 5 },
                { name: 'Signal generators', qty: 5 },
                { name: 'Steam engine', qty: 5 },
                { name: 'Old projector', qty: 5 },
                { name: 'Turntables', qty: 5 },
                { name: 'Lenz’s law apparatus', qty: 5 },
                { name: 'Alpha particle scattering apparatus', qty: 5 },
                { name: 'Wire loop equipment', qty: 5 },
                { name: 'Large rheostats', qty: 5 },
                { name: 'Ramps', qty: 5 },
                { name: 'GC Columns', qty: 5 },
                { name: 'Syringes (GC)', qty: 10 }
            ],
            'Cupboard B': [{ name: 'Vials (GC/MS)', qty: 500 }, { name: 'Septa', qty: 1000 }],
            'Cupboard C': [{ name: 'Rotary Evaporator Flasks', qty: 8 }],
            'Cupboard D': [{ name: 'Vacuum Grease', qty: 2 }],
            'Cupboard E': [{ name: 'Dry Ice Container', qty: 1 }],
            'Cupboard F': [{ name: 'Solvent Bottles', qty: 15 }],
            'Cabinet a': [{ name: 'Radioactive cupboard containing sources and Protactinium Generator', qty: 5 }, { name: '“wooden box” Geiger Muller tube', qty: 5 }, { name: 'Lasers and pens', qty: 5 }, { name: 'EHT supply', qty: 2 }, { name: 'HT supply', qty: 5 }, { name: 'Scalar/timer', qty: 5 }, { name: 'Centisecond timer', qty: 5 }, { name: 'DC Amplifier/Electrometer', qty: 5 }, { name: 'big box of large lamps e.g. lighthouse one for Electricity topic Physics', qty: 5 }],
            'Cabinet b': [{ name: '2 x spectrometers and bits (2 x boxes)', qty: 2 }, { name: 'Kinetic Theory Model', qty: 5 }, { name: 'Transformer for discharge lamps', qty: 5 }, { name: 'Sodium Lamp with Transformer', qty: 5 }, { name: 'Discharge lamps', qty: 5 }, { name: 'Travelling microscope', qty: 5 }, { name: 'Microscope', qty: 5 }, { name: 'Rayzer Boards with adapters', qty: 5 }, { name: 'Rectangular and semi-circular blocks', qty: 5 }, { name: 'Convex and concave lenses', qty: 5 }],
            'Teletron Tubes Stand': [{ name: 'Teletron tubes – Cathode Ray tube, Demonstration Triode, Double Beam tube, Electron Diffraction tube, Maltese Cross, Perrin tube', qty: 6 }, { name: 'stands for teletron tubes', qty: 2 }],
            'Helmholtz Coils Stand': [{ name: 'Helmholtz coils', qty: 2 }],
            'Circular Motion Equipment': [{ name: 'Circular motion equipment (5 boxes)', qty: 5 }],
            'Electrostatics Trolley': [{ name: 'static stuff', qty: 5 }, { name: 'Planck’s Constant apparatus', qty: 5 }, { name: 'coulomb meters', qty: 2 }, { name: 'large coils', qty: 5 }, { name: 'capacitor plates', qty: 5 }],
        }
    },
    'Lab 8': {
        cabinets: {
            'Cupboard A': [{ name: 'Microscopes (light)', qty: 15 }, { name: 'Petri Dishes (sterile)', qty: 50 }],
            'Cupboard B': [{ name: 'Forceps (fine)', qty: 10 }, { name: 'Scalpels', qty: 20 }],
            'Cupboard C': [{ name: 'Centrifuge Tubes', qty: 200 }],
            'Cupboard D': [{ name: 'Microscope slides (blank)', qty: 200 }, { name: 'Cover slips (blank)', qty: 200 }],
            'Cupboard E': [{ name: 'Test tube racks (plastic)', qty: 10 }, { name: 'Pipettes (plastic disposable)', qty: 500 }],
            'Cupboard F': [{ name: 'Bunsen burners', qty: 8 }]
        }
    },
    'Lab 9': {
        cabinets: {
            'Cupboard A': [{ name: 'Stopwatches', qty: 10 }, { name: 'Pulleys', qty: 20 }],
            'Cupboard B': [{ name: 'Trolleys (dynamics)', qty: 10 }, { name: 'Spring balances', qty: 15 }],
            'Cupboard C': [{ name: 'Metre rules', qty: 30 }, { name: 'Measuring tapes', qty: 5 }],
            'Cupboard D': [{ name: 'Masses (slotted)', qty: 5 }, { name: 'Density cubes', qty: 1 }],
            'Cupboard E': [{ name: 'Light gates', qty: 8 }, { name: 'Timers (digital)', qty: 8 }],
            'Cupboard F': [{ name: 'Magnets (bar)', qty: 10 }, { name: 'Plotting compasses', qty: 15 }]
        }
    },
    'Lab 10': {
        cabinets: {
            'Cupboard A': [{ name: 'Electrolysis kits', qty: 5 }, { name: 'Voltameters', qty: 5 }],
            'Cupboard B': [{ name: 'Cells (power)', qty: 20 }, { name: 'Resistors (various)', qty: 'assorted' }],
            'Cupboard C': [{ name: 'Capacitors', qty: 'assorted' }],
            'Cupboard D': [{ name: 'Multimeters (digital)', qty: 10 }, { name: 'Ammeters', qty: 10 }],
            'Cupboard E': [{ name: 'Voltmeters', qty: 10 }],
            'Cupboard F': [{ name: 'Circuit boards', qty: 15 }]
        }
    },
    'Preproom': {
        subcategories: {
            'Biology': {
                cabinets: {
                    'Biology Column 01': [{ name: 'Microscopes (light)', qty: 10 }, { name: 'Microscopes (digital)', qty: 5 }, { name: 'Petri dishes (sterile)', qty: '50 packs' }],
                    'Biology Column 02': [{ name: 'Agar plates (nutrient)', qty: '20 packs' }, { name: 'Pipette tips (1000uL)', qty: '1 box' }, { name: 'Pipette tips (200uL)', qty: '1 box' }],
                    'Biology Column 03': [{ name: 'Dissection trays', qty: 15 }, { name: 'Dissection tools (sets)', qty: 10 }, { name: 'Forceps', qty: 25 }],
                    'Biology Column 04': [{ name: 'Goggles', qty: 100 }, { name: 'Lab coats', qty: 50 }, { name: 'Gloves (latex)', qty: '1 box' }],
                    'Biology Column 05': [{ name: 'Microscope slides', qty: '10 boxes' }, { name: 'Cover slips', qty: '10 boxes' }, { name: 'Immersion oil', qty: 1 }],
                    'Biology Column 06': [{ name: 'Stains (methylene blue)', qty: '5 bottles' }, { name: 'Stains (iodine)', qty: '5 bottles' }],
                    'Biology Column 07': [{ name: 'Centrifuge tubes', qty: 500 }, { name: 'Eppendorf tubes', qty: 1000 }],
                    'Biology Column 08': [{ name: 'Electrophoresis gel tanks', qty: 2 }, { name: 'Power supplies (gel)', qty: 2 }],
                    'Biology Column 09': [{ name: 'PCR machine', qty: 1 }, { name: 'Thermal cycler', qty: 1 }],
                    'Biology Column 10': [{ name: 'Water baths', qty: 3 }, { name: 'Incubators', qty: 2 }],
                    'Biology Column 11': [{ name: 'Autoclave', qty: 1 }, { name: 'Laminar flow hood', qty: 1 }],
                    'Biology Column 12': [{ name: 'pH meters', qty: 5 }, { name: 'Buffers (pH 4)', qty: '1L' }, { name: 'Buffers (pH 7)', qty: '1L' }],
                    'Biology Column 13': [{ name: 'Weighing scales (digital)', qty: 3 }],
                    'Biology Column 14': [{ name: 'Magnetic stirrers', qty: 5 }, { name: 'Stirring bars', qty: 20 }],
                    'Biology Column 15': [{ name: 'Bunsen burners', qty: 15 }],
                    'Biology Column 16': [{ name: 'Glass beakers (various sizes)', qty: 50 }],
                    'Biology Column 17': [{ name: 'Glass flasks (conical)', qty: 30 }],
                    'Biology Column 18': [{ name: 'Measuring cylinders (various)', qty: 25 }],
                    'Biology Column 19': [{ name: 'Pipettes (volumetric)', qty: 10 }],
                    'Biology Column 20': [{ name: 'Pipette stands', qty: 5 }],
                    'Biology Column 21': [{ name: 'Safety signs (biohazard)', qty: 5 }],
                    'Biology Column 22': [{ name: 'First aid kits', qty: 2 }],
                    'Biology Column 23': [{ name: 'Fire extinguishers', qty: 1 }],
                    'Biology Column 24': [{ name: 'Emergency shower', qty: 1 }],
                    'Biology Column 25': [{ name: 'Eye wash station', qty: 1 }],
                    'Biology Column 26': [{ name: 'Waste disposal bins (bio)', qty: 3 }],
                    'Biology Column 27': [{ name: 'Specimens (preserved)', qty: 10 }],
                    'Biology Column 28': [{ name: 'Models (DNA, cell)', qty: 5 }],
                    'Biology Column 29': [{ name: 'Charts (biology posters)', qty: 10 }],
                    'Biology Column 30': [{ name: 'Microscope cameras', qty: 2 }]
                }
            },
            'Chemistry': {
                cabinets: {
                    'Chemistry Column 01': [{ name: 'Pipette Fillers', qty: 5 }, { name: 'Wooden white tiles', qty: 5 }, { name: 'Wide Neck Conical Flask', qty: 5 }, { name: 'Narrow Neck Conical Flask', qty: 5 }, { name: 'Graduated + Bulb Pipette (1 Ml)', qty: 5 }, { name: 'Graduated + Bulb Pipette (2Ml)', qty: 5 }, { name: 'Graduated + Bulb Pipette (5 Ml)', qty: 5 }, { name: 'Graduated + Bulb Pipette (10 Ml)', qty: 5 }, { name: 'Graduated + Bulb Pipette (20 + 25 Ml)', qty: 5 }, { name: 'Distillation kit (Odd bits)', qty: 5 }, { name: 'Distillation Kit (Large bits)', qty: 5 }, { name: 'Distillation Kit', qty: 5 }, { name: '3 Neck round bottom flask + Other distillation bits', qty: 5 }],
                    'Chemistry Column 02': [{ name: 'Round bottom flask (50 + 100ml)', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Quick Fit Distillation Kit', qty: 5 }, { name: 'Pear Shaped flask with 2 neck + odd bits to fit distillation kit', qty: 5 }, { name: 'Distillation Sets + Liebig condenser', qty: 3 }, { name: 'Fractionating column', qty: 5 }, { name: 'Part of quick for kit + conical flask + round bottom flask', qty: 5 }],
                    'Chemistry Column 03': [{ name: 'Buchner funnel (Small)', qty: 5 }, { name: 'Test Tubes + Boiling Tubes with Side arm', qty: 5 }, { name: 'Buchner Funnel (Large)', qty: 5 }, { name: 'Glass funnel with filter attached', qty: 5 }, { name: 'Separating Conical flask (250 Ml)', qty: 5 }, { name: 'Separating conical flask + Cylindrical flask with stoppers (500 Ml)', qty: 5 }, { name: 'Conical flask with side arm (500 Ml)', qty: 5 }, { name: 'Conical flask with side arm + tubing attached (250 + 500 Ml)', qty: 5 }, { name: 'Conical flask with side arm + tubing attached (250 + 500 ml)', qty: 5 }, { name: 'Filter paper (Different type)', qty: 5 }, { name: 'Filter funnel + Buchner funnel filter Paper (Different type)', qty: 5 }],
                    'Chemistry Column 04': [{ name: 'Delivery tube Glass (Right angle bend with stopper attached)', qty: 5 }, { name: 'Delivery tube (With tubing + stopper attached)', qty: 5 }, { name: 'Glass Deliver tube', qty: 5 }, { name: 'Glass delivery tube', qty: 5 }, { name: 'Thistle funnel + glass hollow pipe', qty: 5 }, { name: 'Small Bunsen burner', qty: 5 }, { name: 'Deflagrating spoon', qty: 5 }, { name: 'Deflagrating spoon', qty: 5 }, { name: 'Crucible', qty: 5 }, { name: 'Porcelain boat', qty: 5 }, { name: 'Porcelain + metal + Triangle with metal gauze', qty: 5 }, { name: 'Spouted boiling tube with tubing attached', qty: 5 }, { name: 'Spirit oil burners', qty: 5 }, { name: 'Water Pumps', qty: 5 }],
                    'Chemistry Column 05': [{ name: 'Large filter funnel (Plastic)', qty: 5 }, { name: 'Copper cans', qty: 5 }, { name: 'Product of combustion', qty: 5 }, { name: 'Conical flask with side arm + Buchner funnel (250 Ml)', qty: 5 }, { name: 'Delivery tubes', qty: 5 }, { name: 'Thistle funnel with stopper', qty: 5 }, { name: 'Stoppers (Solids) No.s 23, 25, 30.', qty: 5 }, { name: 'Stoppers (Solids) No.s 13 (TT), 21 (BT)', qty: 5 }, { name: 'Stoppers (Solids) No.s 11, 15, 17, 27, 29, 41, 49.', qty: 5 }, { name: 'Stoppers (Single hole) No.s 10, 11, 15, 17, 19', qty: 5 }, { name: 'Stoppers (Single hole) No.s 13 (TT) , 21 (BT)', qty: 5 }, { name: 'Stoppers (Single hole) No.s 23, 25, 27, 29, 30.', qty: 5 }, { name: 'Stopper (Double hole) No.s 15, 17, 19, 23, 25, 27, 29', qty: 5 }, { name: 'Cork Borers (Assorted sizes)', qty: 5 }, { name: 'Cork Borers (Assorted sizes)', qty: 5 }],
                    'Chemistry Column 06': [{ name: 'Dessicator (Used for cobalt paper)', qty: 5 }, { name: 'Thermometers (Various temperatures)', qty: 5 }, { name: 'Dreschel bottle + Plain head + Long neck round bottom flask', qty: 5 }, { name: 'Gas syringes', qty: 5 }, { name: 'Boiling tubes with side arm', qty: 5 }, { name: '‘U’ shaped tubes with side arm', qty: 5 }, { name: 'Large filter funnel (Glass)', qty: 5 }, { name: 'Glass filter funnel (Small)', qty: 5 }, { name: 'Assorted glassware (Small)', qty: 5 }, { name: 'Fermentation lock', qty: 5 }, { name: 'Film canisters', qty: 5 }],
                    'Chemistry Column 07': [{ name: 'Capillary Tube', qty: 5 }, { name: 'Colorimeter', qty: 5 }, { name: 'PH Metre', qty: 5 }, { name: 'Magnetic Stirrers', qty: 5 }, { name: 'Magnetic Stirrers', qty: 5 }, { name: 'Magnetic Stirrers', qty: 5 }, { name: 'PH Metre', qty: 5 }, { name: 'Flea for Magnetic Stirrer', qty: 5 }, { name: 'Odd Broken glass bits', qty: 5 }, { name: 'Magnetic Stirrer', qty: 5 }, { name: 'Protein amino acid kit', qty: 5 }, { name: 'Odd Cables with plugs', qty: 5 }],
                    'Chemistry Column 08': [{ name: 'Technicians guide for Chemistry + S2', qty: 5 }, { name: 'Kosar’s Tray', qty: 5 }, { name: 'Roman’s Tray', qty: 5 }, { name: 'Hazards Labels tray', qty: 5 }, { name: 'Polypockets + A4 Folders', qty: 5 }, { name: 'Guoy + Almasa LCD display Balance', qty: 5 }, { name: 'Tubing clamp + Tubing Adaptor', qty: 5 }, { name: 'Lightning tapers', qty: 5 }],
                    'Chemistry Column 09': [{ name: 'Lamp Holders 2.5V', qty: 5 }, { name: 'Chemistry Handouts + Laminated cards', qty: 5 }, { name: 'Assorted metals tray (Mg, Cu, Ni, Zn, in form of squares + strips. Iron nails)', qty: 5 }, { name: 'Assorted metals tray', qty: 5 }, { name: 'Assorted metals tray', qty: 5 }, { name: 'Assorted metals tray', qty: 5 }, { name: 'Citrus candle making kit', qty: 5 }, { name: 'Metal Lids used for metals cans', qty: 5 }, { name: 'Beer bottle tops', qty: 5 }],
                    'Chemistry Column 10': [{ name: 'Leads Black colours', qty: 5 }, { name: 'Leads Red colours', qty: 5 }, { name: 'Assorted leads', qty: 5 }, { name: 'Multimeter testing kit + Carbon rods + More leads', qty: 5 }, { name: 'Hydrogen + Carbon electrodes', qty: 5 }, { name: 'Crocodile clips', qty: 5 }, { name: '‘D’ Plates + Crocodile clips in black holder', qty: 5 }, { name: 'Plastic beaker electrolysis kit', qty: 5 }, { name: 'Plastic beaker electrolysis kit', qty: 5 }, { name: 'Plastic beaker electrolysis kit', qty: 5 }, { name: 'Microchem kit + current direction meter', qty: 5 }],
                    'Chemistry Column 11': [{ name: 'Alkali & Compound displays', qty: 5 }, { name: 'Ionic Solution + Roman Compound Displays', qty: 5 }, { name: 'Elements Display', qty: 5 }, { name: 'Compounds Display', qty: 5 }, { name: 'Minerals of Britain', qty: 5 }, { name: 'Nichrome wire', qty: 5 }, { name: 'Washable glue', qty: 5 }, { name: 'Elastic Wire + Ideas & Suggestions', qty: 5 }, { name: 'Polymorph', qty: 5 }, { name: 'Polymer Kit + Memory wire', qty: 5 }, { name: 'Photographic Paper + Golf Ball + Other Balls', qty: 5 }],
                    'Chemistry Column 12': [{ name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods (4 sets in a tub)', qty: 5 }, { name: 'Molymods top up kit', qty: 5 }, { name: 'Molymods top up kit', qty: 5 }, { name: 'Molymods top up kit', qty: 5 }, { name: 'Wooden blocks', qty: 5 }, { name: 'Molymods molecular model', qty: 5 }, { name: 'Polystyrene balls', qty: 5 }, { name: 'Compound Cards', qty: 5 }, { name: 'Different material blocks + cubes', qty: 5 }, { name: 'Wooden cones + squares blocks', qty: 5 }, { name: 'Burner wicks', qty: 5 }],
                }
            },
            'Physics': {
                cabinets: {
                    'Physics Column 01': [{ name: 'Fuses', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors, LEDs', qty: 5 }, { name: 'Lamps, fuses', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Lamps', qty: 5 }, { name: 'Lamps', qty: 5 }, { name: 'Masses', qty: 5 }, { name: 'Masses', qty: 5 }],
                    'Physics Column 02': [{ name: 'Phenaskistoscopes', qty: 5 }, { name: 'Variable voltage boards, thermistors', qty: 5 }, { name: 'Accessories for variable voltage boards', qty: 5 }, { name: 'Accessories for variable voltage boards', qty: 5 }, { name: 'Phototronics explorer', qty: 5 }, { name: 'Electromagnetic radiation cards – Higher', qty: 5 }, { name: 'LDRs', qty: 5 }, { name: 'Centre of gravity experiment', qty: 5 }, { name: 'Vernier callipers', qty: 5 }, { name: 'Micrometers', qty: 5 }, { name: 'Long leads, semaphore flags etc', qty: 5 }, { name: 'Telephones', qty: 5 }, { name: 'Phenaskistoscopes', qty: 5 }, { name: 'Masses', qty: 5 }, { name: 'Masses', qty: 5 }],
                    'Physics Column 03': [{ name: 'Wheatstone bridges', qty: 5 }, { name: 'Wheatstone bridges', qty: 5 }, { name: 'Potential divider boards', qty: 5 }, { name: 'Momentum and impulse golf club experiment', qty: 5 }, { name: 'UV lamps and UV meters, Researching Physics unit', qty: 5 }, { name: 'UV lamps and UV meters, Researching Physics unit', qty: 5 }, { name: 'DVD cases, vibration detectors, sun cream, pulleys, Researching Physics unit', qty: 5 }, { name: 'Pressure laws equipment', qty: 5 }, { name: 'Charles’ laws equipment', qty: 5 }, { name: 'Hydrometers', qty: 5 }, { name: 'Masses', qty: 5 }],
                    'Physics Column 04': [{ name: 'Capacitor display boards', qty: 2 }, { name: 'Electric fields apparatus, poppers', qty: 5 }, { name: 'Microwave apparatus', qty: 5 }, { name: 'Microwave apparatus', qty: 5 }, { name: 'Piezo-electric crystals, brass blocks', qty: 5 }, { name: 'Eureka cans', qty: 5 }, { name: 'Eureka cans', qty: 5 }, { name: 'Heating elements, long thermometers', qty: 5 }, { name: 'Metal blocks', qty: 5 }],
                    'Physics Column 05': [{ name: 'Trundle wheel', qty: 5 }, { name: 'Mountain', qty: 5 }, { name: 'Compasses, rope, chalk, long tape measure', qty: 5 }, { name: 'Doppler rocket and accessories', qty: 2 }, { name: 'Mechanical stop clocks, digital tape measure', qty: 5 }, { name: 'Vibrators', qty: 5 }, { name: 'Projectile apparatus', qty: 5 }, { name: 'Tin cans', qty: 5 }, { name: 'Tin cans', qty: 5 }, { name: 'Plastic beakers, 1kg masses', qty: 5 }, { name: 'G-clamps', qty: 5 }],
                    'Physics Column 06': [{ name: 'Newton balances', qty: 5 }, { name: 'Newton balances', qty: 5 }, { name: 'Newton balances', qty: 5 }, { name: 'Newton balances', qty: 5 }, { name: 'Pulleys', qty: 5 }, { name: 'Pulleys', qty: 5 }, { name: 'Springs', qty: 5 }, { name: 'Springs', qty: 5 }, { name: 'Bench pulleys', qty: 5 }, { name: 'Resistance boxes', qty: 5 }, { name: 'Boards with fixed points', qty: 5 }, { name: 'Calorimeter cans', qty: 5 }, { name: 'Laboratory jacks', qty: 5 }, { name: 'Young’s modulus', qty: 5 }],
                    'Physics Column 07': [{ name: 'Box with polystyrene bits', qty: 5 }, { name: 'Trolleys', qty: 5 }, { name: 'Trolley accessories', qty: 5 }, { name: 'Trolleys', qty: 5 }, { name: 'Trolleys', qty: 5 }, { name: 'Trolleys', qty: 5 }, { name: 'Trolleys', qty: 5 }, { name: 'Trolleys', qty: 5 }],
                    'Physics Column 08': [{ name: 'Perspex shapes', qty: 5 }, { name: 'Accessories for grey meters', qty: 5 }, { name: 'Accessories for grey meters', qty: 5 }, { name: 'Accessories for grey meters', qty: 5 }, { name: 'Accessories for grey meters', qty: 5 }, { name: 'Grey meters', qty: 5 }, { name: 'Digital meters', qty: 5 }, { name: 'Accessories for digital meters', qty: 5 }, { name: 'Digital meters', qty: 5 }, { name: 'Digital meters', qty: 5 }, { name: 'Grey meters', qty: 5 }],
                    'Physics Column 09': [{ name: 'Optical kits with mirrors', qty: 5 }, { name: 'X-rays', qty: 5 }, { name: 'Glass blocks', qty: 5 }, { name: 'Glass blocks', qty: 5 }, { name: 'Glass blocks', qty: 5 }, { name: 'Glass blocks, lenses', qty: 5 }, { name: 'Lenses', qty: 5 }, { name: 'Ray boxes', qty: 5 }, { name: 'Ray boxes', qty: 5 }, { name: 'Ray boxes', qty: 5 }, { name: 'Bits for ray boxes', qty: 5 }, { name: 'Attachments for optical benches', qty: 5 }, { name: 'Digital meters', qty: 5 }, { name: 'Digital meters', qty: 5 }],
                    'Physics Column 10': [{ name: 'Whoosh of air apparatus', qty: 5 }, { name: 'Very large magnifying lenses and holders', qty: 5 }, { name: 'Glass blocks', qty: 5 }, { name: 'Mirrors', qty: 5 }, { name: 'Optical fibres, glass rods, 250ml measuring cylinder, chalk, Perspex block for laser', qty: 5 }, { name: 'UV lamps', qty: 5 }, { name: '12V mounted lamps', qty: 5 }, { name: 'Sensors – light, magnetic flux, infra-red, distance', qty: 5 }, { name: 'Sodium flame pencils, Newtons ring apparatus, hologram, adjustable slit , slits', qty: 5 }, { name: 'CDs, diffraction gratings, colour mixing set, glass plates for interference, Moiré’s fringes', qty: 5 }, { name: 'Mirrors', qty: 5 }, { name: 'Filters, large camera lenses', qty: 5 }, { name: 'Large lamps', qty: 5 }, { name: 'Prisms', qty: 5 }],
                    'Physics Column 11': [{ name: 'Accessories for Monkey and Hunter experiment', qty: 5 }, { name: 'Space rocket with bottles and copper wire', qty: 5 }, { name: 'Strobe light', qty: 5 }, { name: 'Accessories for strobe light, tuning forks', qty: 5 }, { name: 'Marbles, ball bearings, polystyrene balls etc', qty: 5 }, { name: 'Tennis balls, table tennis balls, straws, super balls', qty: 5 }, { name: 'Radiant heaters, halogen lamp for model eye', qty: 5 }, { name: 'Radios, tape recorders and microphones', qty: 5 }],
                    'Physics Column 12': [{ name: 'Pasco extras, projectile apparatus', qty: 5 }, { name: 'TSA timers', qty: 5 }, { name: 'TSA timers', qty: 5 }, { name: 'TSA timers adaptors', qty: 5 }, { name: 'Lights gates, receivers, nuts and bolts for attaching masks to trolleys', qty: 5 }, { name: 'Masks, blutak, elastics for trolleys, thread, 10g masses, pulley for Pasco track', qty: 5 }, { name: 'Laptop and charger', qty: 5 }, { name: 'USB connector, motion sensor, force sensor, voltage/current sensor', qty: 5 }, { name: 'Fizz pop rocket equipment', qty: 5 }, { name: 'Tin cans, large coffee tin “g” apparatus', qty: 5 }, { name: 'Double pan balances', qty: 2 }],
                    'Physics Column 13': [{ name: 'Sodium lamp', qty: 5 }, { name: 'Wooden blocks with sandpaper etc', qty: 5 }, { name: 'Wind-up animals', qty: 5 }, { name: 'Stearic acid/Salol experiments', qty: 5 }, { name: 'Radio kits', qty: 5 }, { name: 'Water pumps', qty: 5 }, { name: 'Coils of wire – 20,40,60', qty: 5 }, { name: 'Coils 60:60, 500:125, clips and c-cores', qty: 5 }, { name: 'Transmission line demonstration', qty: 5 }],
                    'Physics Column 14': [{ name: 'Properties of matter Higher equipment', qty: 5 }, { name: 'Magnets', qty: 5 }, { name: 'Magnets', qty: 5 }, { name: 'Electronics trolley – power packs', qty: 5 }, { name: 'Electronics trolley – power packs', qty: 5 }, { name: 'Electronics trolley', qty: 5 }],
                    'Physics Column 15': [{ name: 'Model eye – flask in Chemistry prep room', qty: 5 }, { name: 'Electronics trolley – guide in drawers', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley', qty: 5 }, { name: 'Electronics trolley including large LDRs and thermocouples', qty: 5 }],
                    'Physics Column 16': [{ name: 'Instructions A-N', qty: 5 }, { name: 'Instructions O-Z', qty: 5 }, { name: 'Resistor holders, switches, two-way switches, lamps', qty: 5 }, { name: 'Tools', qty: 5 }, { name: 'Cells', qty: 5 }, { name: 'Leads and crocodile clips', qty: 5 }, { name: 'Leads', qty: 5 }, { name: 'Old Standard Grade booklets', qty: 5 }, { name: 'Cable', qty: 5 }],
                    'Physics Column 17': [{ name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Resistors', qty: 5 }, { name: 'Diodes', qty: 5 }, { name: 'Resistors – unknown, resistor charts, hand lenses', qty: 5 }, { name: 'Variable resistors', qty: 5 }, { name: 'Variable resistors', qty: 5 }],
                    'Physics Column 18': [{ name: 'Odd/large capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Capacitors', qty: 5 }, { name: 'Large yellow holders for cells', qty: 5 }, { name: 'Short leads, leads with jack plugs', qty: 5 }],
                    'Physics Column 19': [{ name: 'Speed of sound equipment', qty: 5 }, { name: 'Morse code equipment', qty: 5 }, { name: 'Morse code equipment', qty: 5 }, { name: 'Buzzers, candles, rattling eggs etc', qty: 5 }, { name: 'Slinkys', qty: 5 }, { name: 'Sound meters', qty: 4 }, { name: 'Sound meters, large', qty: 2 }, { name: 'ear defenders', qty: 5 }, { name: 'Loudspeaker making equipment', qty: 5 }, { name: 'Brownian Motion apparatus', qty: 5 }],
                    'Physics Column 20': [{ name: 'Wire cutters, 3 core cable', qty: 5 }, { name: 'Series circuit boards', qty: 10 }, { name: 'Parallel circuit boards', qty: 10 }, { name: 'Electrical plugs', qty: 5 }, { name: 'Screwdrivers, shake flashlight, hand generator torch', qty: 5 }, { name: 'Electric motors', qty: 5 }, { name: 'Fred model, Megger, conductivity experiment', qty: 5 }, { name: 'Plug wiring kit', qty: 5 }, { name: 'Appliances with faults', qty: 5 }, { name: 'Appliances with faults', qty: 5 }],
                    'Physics Column 21': [{ name: 'Brass terminals, panel pins, wire', qty: 5 }, { name: 'Iron rods, leads, paper clips', qty: 5 }, { name: 'Leads, electric motors', qty: 5 }, { name: 'Electric motor kit', qty: 5 }, { name: 'Electric motor kit', qty: 5 }, { name: 'Electric motor kit', qty: 5 }, { name: 'Mains ammeter, iron rods', qty: 5 }, { name: 'Bells', qty: 5 }, { name: 'Tray of electromagnetic equipment', qty: 5 }, { name: '12V lamps – different wattages', qty: 5 }, { name: 'Plotting compasses, reed switches, reed coils, conductor/insulator kits, paper clips, electromagnetic relay', qty: 5 }, { name: 'Circuit breakers, fuse holders, metre lengths of wire', qty: 5 }, { name: 'Elements with ratings', qty: 5 }, { name: 'Electric motor', qty: 5 }],
                    'Next to Column 7': [{ name: 'Sonometers', qty: 5 }, { name: 'Metre bridges', qty: 5 }],
                    'Big tub next to Column 16': [{ name: 'Bicycle pump', qty: 5 }, { name: 'Cables, large, optical fibre', qty: 5 }, { name: 'Free fall tube, Guinea and Feather apparatus', qty: 5 }, { name: 'Optical benches', qty: 5 }, { name: 'Rocket launcher', qty: 5 }, { name: 'Stands for Monkey and Hunter experiment', qty: 2 }],
                }
            },
            'Chemical Store': {
                'C1': [{ name: 'Sulfuric Acid (conc)', qty: '5L' }, { name: 'Nitric Acid (conc)', qty: '5L' }],
                'C2': [{ name: 'Sodium Hydroxide Pellets', qty: '1kg' }, { name: 'Potassium Chloride', qty: '500g' }],
                'C3': [{ name: 'Ethanol (95%)', qty: '2.5L' }, { name: 'Acetone', qty: '1L' }],
                'C4': [{ name: 'Indicators (Litmus)', qty: '100 tabs' }, { name: 'Universal Indicator Solution', qty: '500ml' }],
                'Shelves': {
                    'Main Shelf 1': [{ name: 'Assorted Bottles (empty)', qty: 50 }, { name: 'Cleaning Supplies (chemical)', qty: 10 }],
                    'Main Shelf 2': [{ name: 'Distilled Water (bulk)', qty: '20L' }, { name: 'Spare Caps & Lids', qty: 'Box' }]
                }
            }
        }
    },
    'Greenhouse': {
        cabinets: {
            'Cabinet A': [{ name: 'Radioactive cupboard containing sources and Protactinium Generator', qty: 5 }, { name: '“wooden box” Geiger Muller tube', qty: 5 }, { name: 'Lasers and pens', qty: 5 }, { name: 'EHT supply', qty: 2 }, { name: 'HT supply', qty: 5 }, { name: 'Scalar/timer', qty: 5 }, { name: 'Centisecond timer', qty: 5 }, { name: 'DC Amplifier/Electrometer', qty: 5 }, { name: '(on top of metal cupboard) – big box of large lamps e.g. lighthouse one for Electricity topic Physics', qty: 5 }],
            'Cabinet B': [{ name: '2 x spectrometers and bits (2 x boxes)', qty: 2 }, { name: 'Kinetic Theory Model', qty: 5 }, { name: 'Transformer for discharge lamps', qty: 5 }, { name: 'Sodium Lamp with Transformer', qty: 5 }, { name: 'Discharge lamps', qty: 5 }, { name: 'Travelling microscope', qty: 5 }, { name: 'Microscope', qty: 5 }, { name: 'Rayzer Boards with adapters', qty: 5 }, { name: 'Rectangular and semi-circular blocks', qty: 5 }, { name: 'Convex and concave lenses', qty: 5 }],
        }
    },
    'Bookstore': {
        basic: [{ name: 'Periodic Tables (poster)', qty: 20 }, { name: 'Safety Goggles', qty: 100 }, { name: 'Linear Air Track', qty: 2 }, { name: 'Blowers', qty: 5 }, { name: 'Vehicles', qty: 5 }, { name: 'Pasco track and vehicles', qty: 5 }],
        cabinets: {
            'Shelf A': [{ name: 'Lab Manuals (Chemistry)', qty: 50 }, { name: 'Lab Manuals (Biology)', qty: 40 }],
            'Shelf B': [{ name: 'Microscope Guides', qty: 15 }, { name: 'Dissection Guides', qty: 15 }]
        }
    },
    'Academy': {
        basic: [{ name: 'Marker Pens (assorted)', qty: 50 }, { name: 'Whiteboard Erasers', qty: 10 }],
        cabinets: {
            'Cabinet A': [{ name: 'HDMI Cables', qty: 15 }, { name: 'Extension Cords', qty: 10 }],
            'Cabinet B': [{ name: 'Projectors (spare)', qty: 2 }, { name: 'Microphones (wireless)', qty: 4 }]
        }
    }
};

const standardBasicEquipment = [{ name: 'Goggles', qty: 21 }, { name: 'Bunsen Burners', qty: 10 }, { name: 'Heating Mats', qty: 10 }, { name: 'Tripods', qty: 10 }, { name: 'Clampstands', qty: 10 }];
const standardGeneralLabware = [{ name: '250ml Beakers', qty: 10 }, { name: '100ml Beakers', qty: 10 }, { name: '100ml Measuring Cylinders', qty: 10 }, { name: 'Spatulas', qty: 10 }, { name: 'Stirring Rods', qty: 10 }, { name: 'Funnels', qty: 10 }, { name: 'Wooden Tongs', qty: 10 }, { name: 'Metal Tongs', qty: 10 }, { name: 'Beaker Holders', qty: 10 }, { name: 'Test Tubes', qty: '2 tubs' }, { name: 'Boiling Tubes', qty: '2 tubs' }];

let archivedEquipment = [];

function showContent(title, html) {
    contentArea.innerHTML = `<h2>${title}</h2>${html}`;
}

function pushState(state) {
    navigationStack.push(state);
    backBtn.disabled = navigationStack.length <= 1;
    updateButtonVisibility();
}

function goBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop();
        const prevState = navigationStack[navigationStack.length - 1];
        renderState(prevState);
    } else {
        showWelcome();
    }
}

function updateButtonVisibility() {
    const currentState = navigationStack[navigationStack.length - 1];
    const isSearchOrArchive = currentState && (currentState.type === 'search' || currentState.type === 'archive');
    searchBtn.classList.toggle('hidden', isSearchOrArchive);
    addEquipmentBtn.classList.toggle('hidden', isSearchOrArchive);
    mapBtn.classList.toggle('hidden', currentState && currentState.type === 'map');
    archiveBtn.classList.toggle('hidden', currentState && currentState.type === 'archive');
}

function renderState(state) {
    mapDiv.style.display = 'none';
    contentArea.classList.remove('hidden');

    switch (state.type) {
        case 'map':
            showMap();
            break;
        case 'lab':
            displayLab(state.name, state.showBasic, state.showGeneralLabware);
            break;
        case 'main':
            if (state.area === 'Preproom') showPreproom();
            else if (state.area === 'Greenhouse') showGreenhouse();
            else if (state.area === 'Bookstore') showBookstore();
            else if (state.area === 'Academy') showAcademy();
            break;
        case 'subarea':
            showSubArea(state.parent, state.name);
            break;
        case 'cabinet':
            showCabinet(state.parent, state.mainArea, state.cabinetName);
            break;
        case 'shelf':
            showShelf(state.parent, state.subArea, state.shelfName);
            break;
        case 'search':
            showEquipmentSearch(state.resultsHtml);
            break;
        case 'archive':
            showArchiveView();
            break;
        default:
            showWelcome();
            break;
    }
    attachDynamicEventListeners();
}

function showWelcome() {
    showContent('Welcome to the Laboratory Inventory', `<p>Select an area on the map to explore.</p>`);
    mapDiv.style.display = 'grid';
    navigationStack = [{ type: 'map' }];
    backBtn.disabled = true;
    updateButtonVisibility();
}

function showMap() {
    showWelcome();
}

function showArchiveView() {
    pushState({ type: 'archive' });
    let html = '';
    if (archivedEquipment.length === 0) {
        html = '<p>The archive is currently empty.</p>';
    } else {
        html = '<h3>Archived Equipment</h3><ul>';
        archivedEquipment.forEach((item, index) => {
            html += `
                <li class="equipment-item">
                    <span class="equipment-name">${item.name} (Qty: ${item.qty})</span>
                    <div class="item-actions">
                        <button class="restore-item" data-action="restore" data-path="${item.originalPath}" data-index="${index}">
                            <i class="fa-solid fa-undo"></i> Restore
                        </button>
                        <button class="delete-item" data-action="permanent-delete" data-index="${index}">
                            <i class="fa-solid fa-trash-alt"></i> Delete
                        </button>
                    </div>
                </li>
            `;
        });
        html += '</ul>';
    }
    showContent('Archived Items', html);
    attachDynamicEventListeners();
}

function generateEquipmentListHTML(items, itemType, itemPath, isArchived = false) {
    let html = '<ul>';
    if (items && items.length > 0) {
        items.forEach((item, index) => {
            const uniqueId = `qty-${itemType}-${itemPath.join('-')}-${index}`;
            html += `
                <li class="equipment-item">
                    <span class="equipment-name">${item.name}</span>
                    <div class="quantity-controls">
                        <button data-action="decrease" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">-</button>
                        <input type="text" id="${uniqueId}" value="${item.qty}" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">
                        <button data-action="increase" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">+</button>
                    </div>
                    <div class="item-actions">
                        ${isArchived ? `
                            <button class="restore-item" data-action="restore" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">
                                <i class="fa-solid fa-undo"></i> Restore
                            </button>
                            <button class="delete-item" data-action="permanent-delete" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">
                                <i class="fa-solid fa-trash-alt"></i> Delete
                            </button>
                        ` : `
                            <button class="archive-item" data-action="archive" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">
                                <i class="fa-solid fa-box-archive"></i> Archive
                            </button>
                            <button class="delete-item" data-action="delete" data-type="${itemType}" data-path="${itemPath.join(',')}" data-index="${index}">
                                <i class="fa-solid fa-trash-alt"></i> Delete
                            </button>
                        `}
                    </div>
                </li>
            `;
        });
    } else {
        html += `<p>No equipment found here.</p>`;
    }
    html += '</ul>';
    return html;
}

function showLab(labName) {
    const currentState = navigationStack[navigationStack.length - 1];
    const newState = (currentState && currentState.type === 'lab' && currentState.name === labName) ? currentState : { type: 'lab', name: labName, showBasic: false, showGeneralLabware: false };
    if (newState !== currentState) {
        pushState(newState);
    }
    displayLab(newState.name, newState.showBasic, newState.showGeneralLabware);
}

function displayLab(labName, showBasic = false, showGeneralLabware = false) {
    const data = equipmentData[labName];
    if (!data) {
        showContent(labName, `<p>No data available for ${labName}.</p>`);
        return;
    }

    let html = '';
    if (data.basic && data.basic.length > 0) {
        html += `<h3>General Equipment</h3>${generateEquipmentListHTML(data.basic, 'basic', [labName, 'basic'])}`;
    }

    html += `
        <h3>Basic Equipment</h3>
        <button class="toggle-button" data-toggle="basic" data-lab="${labName}">
            ${showBasic ? 'Hide Basic Equipment' : 'Show Basic Equipment'}
        </button>
        <div id="basicEquipmentContainer" class="${showBasic ? '' : 'hidden'}">
            ${generateEquipmentListHTML(standardBasicEquipment, 'standardBasic', ['standardBasic'])}
        </div>
        <h3>General Labware</h3>
        <button class="toggle-button" data-toggle="generalLabware" data-lab="${labName}">
            ${showGeneralLabware ? 'Hide General Labware' : 'Show General Labware'}
        </button>
        <div id="generalLabwareContainer" class="${showGeneralLabware ? '' : 'hidden'}">
            ${generateEquipmentListHTML(standardGeneralLabware, 'standardLabware', ['standardLabware'])}
        </div>
    `;

    const cabinetNames = Object.keys(data.cabinets || {});
    if (cabinetNames.length > 0) {
        html += '<h3>Cabinets</h3><div class="cabinet-buttons">';
        cabinetNames.forEach(cab => {
            html += `<button class="cabinet-button-js" data-parent="Lab" data-mainarea="${labName}" data-cabinet="${cab}">${cab}</button>`;
        });
        html += '</div>';
    }

    showContent(labName, html);
    attachDynamicEventListeners();
}

function showCabinet(parentType, mainAreaName, cabinetName) {
    pushState({ type: 'cabinet', parent: parentType, mainArea: mainAreaName, cabinetName: cabinetName });

    let items, title;
    let path = [];
    if (parentType === 'Lab') {
        items = equipmentData[mainAreaName]?.cabinets?.[cabinetName];
        title = `${mainAreaName} - ${cabinetName}`;
        path = [mainAreaName, 'cabinets', cabinetName];
    } else if (parentType === 'Preproom' && ['Biology', 'Chemistry', 'Physics'].includes(mainAreaName)) {
        items = equipmentData['Preproom']?.subcategories?.[mainAreaName]?.cabinets?.[cabinetName];
        title = `Preproom - ${mainAreaName} - ${cabinetName}`;
        path = ['Preproom', 'subcategories', mainAreaName, 'cabinets', cabinetName];
    } else if (['Greenhouse', 'Bookstore', 'Academy'].includes(parentType)) {
        items = equipmentData[parentType]?.cabinets?.[cabinetName];
        title = `${parentType} - ${cabinetName}`;
        path = [parentType, 'cabinets', cabinetName];
    }

    const html = generateEquipmentListHTML(items, 'cabinet', path);
    showContent(title, html);
    attachDynamicEventListeners();
}

function showShelf(parent, subArea, shelfName) {
    pushState({ type: 'shelf', parent: parent, subArea: subArea, shelfName: shelfName });

    let items, title, itemType, path;
    if (['C1', 'C2', 'C3', 'C4'].includes(shelfName)) {
        items = equipmentData[parent]?.subcategories?.[subArea]?.[shelfName];
        title = `${parent} - ${subArea} - ${shelfName}`;
        itemType = 'shelf';
        path = [parent, 'subcategories', subArea, shelfName];
    } else {
        const prevShelfCategory = navigationStack[navigationStack.length - 2]?.shelfName;
        if (prevShelfCategory === 'Shelves' || shelfName === 'Shelves') {
            items = equipmentData[parent]?.subcategories?.[subArea]?.Shelves?.[shelfName];
            title = `${parent} - ${subArea} - Shelves - ${shelfName}`;
            itemType = 'nestedShelf';
            path = [parent, 'subcategories', subArea, 'Shelves', shelfName];
        }
    }

    const html = generateEquipmentListHTML(items, itemType, path);
    showContent(title, html);
    attachDynamicEventListeners();
}

function showEquipmentSearch(resultsHtml = '') {
    pushState({ type: 'search', resultsHtml: resultsHtml });
    let html = `
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search equipment...">
            <button id="searchBtnConfirm">Search</button>
        </div>
        <div id="searchResults">${resultsHtml}</div>
    `;
    showContent('Search Equipment', html);

    const searchInput = document.getElementById('searchInput');
    const searchBtnConfirm = document.getElementById('searchBtnConfirm');
    const searchResultsDiv = document.getElementById('searchResults');
    searchInput.focus();

    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) {
            searchResultsDiv.innerHTML = '<p>Please enter at least 2 characters to search.</p>';
            return;
        }

        let resultsHtml = '<h3>Search Results:</h3><ul>';
        let found = false;

        const searchList = (list, location, typeDetail = '') => {
            if (!list || !Array.isArray(list)) return;
            list.forEach(item => {
                if (item.name.toLowerCase().includes(query)) {
                    const locationDetail = `<strong>${location}</strong>${typeDetail ? `, ${typeDetail}` : ''}`;
                    resultsHtml += `<li>${item.name} (Qty: ${item.qty}) - Found in: ${locationDetail}</li>`;
                    found = true;
                }
            });
        };

        for (const locationName in equipmentData) {
            const data = equipmentData[locationName];
            if (data.basic) searchList(data.basic, locationName, 'General Items');
            if (locationName.startsWith('Lab')) {
                searchList(standardBasicEquipment, locationName, 'Standard Basic Equipment');
                searchList(standardGeneralLabware, locationName, 'Standard General Labware');
            }
            if (data.cabinets) {
                for (const cabinetName in data.cabinets) {
                    searchList(data.cabinets[cabinetName], locationName, `Cabinet: ${cabinetName}`);
                }
            }
            if (data.subcategories) {
                for (const subcategoryName in data.subcategories) {
                    const subcatData = data.subcategories[subcategoryName];
                    if (subcatData.cabinets) {
                        for (const cabinetName in subcatData.cabinets) {
                            searchList(subcatData.cabinets[cabinetName], locationName, `Section: ${subcategoryName}, Column/Cabinet: ${cabinetName}`);
                        }
                    }
                    if (subcategoryName === 'Chemical Store') {
                        for (const chemShelfName of ['C1', 'C2', 'C3', 'C4']) {
                            if (Array.isArray(subcatData[chemShelfName])) {
                                searchList(subcatData[chemShelfName], locationName, `Section: ${subcategoryName}, ${chemShelfName}`);
                            }
                        }
                        if (subcatData.Shelves) {
                            for (const nestedShelfName in subcatData.Shelves) {
                                searchList(subcatData.Shelves[nestedShelfName], locationName, `Section: ${subcategoryName}, Shelves: ${nestedShelfName}`);
                            }
                        }
                    }
                }
            }
        }

        if (!found) {
            resultsHtml += '<li>No equipment found matching your search.</li>';
        }
        resultsHtml += '</ul>';
        searchResultsDiv.innerHTML = resultsHtml;

        const currentState = navigationStack[navigationStack.length - 1];
        if (currentState.type === 'search') {
            currentState.resultsHtml = resultsHtml;
        }
    };

    searchBtnConfirm.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function addEquipment(location, dynamicSelection, subDynamicSelection, name, quantity) {
    let targetList = null;
    let displayPath = [location];

    if (location.startsWith('Lab')) {
        const labData = equipmentData[location];
        if (labData?.cabinets?.[dynamicSelection]) {
            targetList = labData.cabinets[dynamicSelection];
            displayPath.push(dynamicSelection);
        } else if (dynamicSelection === 'Standard Basic Equipment') {
            targetList = standardBasicEquipment;
            displayPath.push('Standard Basic Equipment');
        } else if (dynamicSelection === 'Standard General Labware') {
            targetList = standardGeneralLabware;
            displayPath.push('Standard General Labware');
        } else if (labData.basic && dynamicSelection === 'General Items') {
            targetList = labData.basic;
            displayPath.push('General Items');
        }
    } else if (location === 'Preproom') {
        const subcatData = equipmentData[location]?.subcategories?.[dynamicSelection];
        if (subcatData?.cabinets?.[subDynamicSelection]) {
            targetList = subcatData.cabinets[subDynamicSelection];
            displayPath.push(dynamicSelection, subDynamicSelection);
        } else if (dynamicSelection === 'Chemical Store') {
            if (subcatData?.[subDynamicSelection]) {
                targetList = subcatData[subDynamicSelection];
                displayPath.push(dynamicSelection, subDynamicSelection);
            } else if (subcatData?.Shelves?.[subDynamicSelection]) {
                targetList = subcatData.Shelves[subDynamicSelection];
                displayPath.push(dynamicSelection, 'Shelves', subDynamicSelection);
            }
        }
    } else if (['Greenhouse', 'Bookstore', 'Academy'].includes(location)) {
        const facilityData = equipmentData[location];
        if (dynamicSelection === 'General Items' && facilityData.basic) {
            targetList = facilityData.basic;
            displayPath.push('General Items');
        } else if (facilityData?.cabinets?.[dynamicSelection]) {
            targetList = facilityData.cabinets[dynamicSelection];
            displayPath.push(dynamicSelection);
        }
    }

    if (!targetList) {
        showCustomModal('Error', 'Could not determine where to add equipment. Please check your selections.', 'error');
        return;
    }

    const existingItem = targetList.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existingItem) {
        if (typeof existingItem.qty === 'number' && typeof quantity === 'number') {
            existingItem.qty += quantity;
        } else if (typeof existingItem.qty === 'string' && typeof quantity === 'string') {
            const existingParts = existingItem.qty.match(/^(\d+)\s*(.*)$/);
            const newParts = quantity.match(/^(\d+)\s*(.*)$/);
            if (existingParts && newParts && existingParts[2] === newParts[2]) {
                existingItem.qty = `${parseInt(existingParts[1], 10) + parseInt(newParts[1], 10)} ${existingParts[2]}`.trim();
            } else {
                targetList.push({ name, qty: quantity });
                showCustomModal('Warning', `Units for "${name}" did not match. Added as a new separate entry. Current: ${existingItem.qty}, New: ${quantity}`);
            }
        } else {
            targetList.push({ name, qty: quantity });
            showCustomModal('Warning', `Quantity type mismatch for "${name}". Added as a new separate entry. Current: ${existingItem.qty}, New: ${quantity}`);
        }
    } else {
        targetList.push({ name, qty: quantity });
    }

    renderState(navigationStack[navigationStack.length - 1]);
    showCustomModal('Success', `Equipment "${name}" (Qty: ${quantity}) added successfully to ${displayPath.join(' -> ')}.`);
}

function updateQuantity(item, valueOrDelta, isDirectValue = false) {
    let currentQty = item.qty;
    if (typeof currentQty === 'string') {
        const parts = currentQty.match(/^(\d+)\s*(.*)$/);
        let numPart = parts ? parseInt(parts[1], 10) : 0;
        const unitPart = parts ? parts[2] : '';
        if (isDirectValue) {
            let newNum = parseInt(valueOrDelta, 10);
            if (isNaN(newNum)) newNum = 0;
            item.qty = `${Math.max(0, newNum)} ${unitPart}`.trim();
        } else {
            numPart = Math.max(0, numPart + valueOrDelta);
            item.qty = `${numPart} ${unitPart}`.trim();
        }
    } else {
        if (isDirectValue) {
            let newNum = parseInt(valueOrDelta, 10);
            if (isNaN(newNum)) newNum = 0;
            item.qty = Math.max(0, newNum);
        } else {
            item.qty = Math.max(0, currentQty + valueOrDelta);
        }
    }
}

function findAndManipulateItem(data, itemPath, index, action) {
    const pathParts = itemPath.split(',');
    let currentList = getItemListFromPath(pathParts);

    if (!currentList) {
        console.error('Final list not found for path:', pathParts);
        return;
    }

    const item = currentList[index];
    if (!item) {
        console.error('Item not found at index:', index, 'for list:', currentList);
        return;
    }

    if (action === 'delete') {
        currentList.splice(index, 1);
        showCustomModal('Deleted', `"${item.name}" has been deleted.`, 'success');
    } else if (action === 'archive') {
        currentList.splice(index, 1);
        archivedEquipment.push({ ...item, originalPath: itemPath });
        showCustomModal('Archived', `"${item.name}" has been moved to the archive.`, 'info');
    } else if (action === 'permanent-delete') {
        archivedEquipment.splice(index, 1);
        showCustomModal('Deleted', `"${item.name}" has been permanently deleted.`, 'success');
    } else if (action === 'restore') {
        const originalPath = item.originalPath.split(',');
        const originalList = getItemListFromPath(originalPath);
        if (originalList) {
            originalList.push(item);
            archivedEquipment.splice(index, 1);
            showCustomModal('Restored', `"${item.name}" has been restored to its original location.`, 'success');
        } else {
            console.error('Failed to find original location for restore:', originalPath);
            showCustomModal('Error', 'Failed to restore item. Original location not found.', 'error');
        }
    }

    const currentState = navigationStack[navigationStack.length - 1];
    if (currentState) {
        renderState(currentState);
    }
}

function getItemListFromPath(path) {
    let currentLevel = null;
    if (path[0] === 'standardBasic') {
        currentLevel = standardBasicEquipment;
    } else if (path[0] === 'standardLabware') {
        currentLevel = standardGeneralLabware;
    } else {
        currentLevel = equipmentData;
        for (let i = 0; i < path.length; i++) {
            const segment = path[i];
            if (currentLevel && currentLevel[segment]) {
                currentLevel = currentLevel[segment];
            } else {
                currentLevel = null;
                break;
            }
        }
    }
    return Array.isArray(currentLevel) ? currentLevel : null;
}

function showCustomModal(title, message, type) {
    confirmModalTitle.textContent = title;
    confirmModalMessage.textContent = message;
    confirmModal.style.display = 'flex';
    confirmModalConfirmBtn.classList.add('hidden');
    confirmModalCancelBtn.textContent = 'OK';
    confirmModalCancelBtn.classList.remove('danger-btn');
    confirmModalCancelBtn.classList.add('success-btn');
    confirmModalConfirmBtn.onclick = null;
    confirmModalCancelBtn.onclick = () => confirmModal.style.display = 'none';
}

function showConfirmationModal(title, message, confirmCallback) {
    confirmModalTitle.textContent = title;
    confirmModalMessage.textContent = message;
    confirmModal.style.display = 'flex';
    confirmModalConfirmBtn.classList.remove('hidden');
    confirmModalCancelBtn.textContent = 'Cancel';
    confirmModalCancelBtn.classList.remove('success-btn');
    confirmModalCancelBtn.classList.add('danger-btn');

    pendingAction = confirmCallback;

    confirmModalConfirmBtn.onclick = () => {
        pendingAction();
        confirmModal.style.display = 'none';
    };
    confirmModalCancelBtn.onclick = () => {
        confirmModal.style.display = 'none';
    };
}

function attachDynamicEventListeners() {
    contentArea.removeEventListener('click', handleDynamicClick);
    contentArea.addEventListener('click', handleDynamicClick);
    contentArea.removeEventListener('change', handleQuantityChange);
    contentArea.addEventListener('change', handleQuantityChange);
}

function handleDynamicClick(event) {
    const target = event.target;
    const itemButton = target.closest('[data-action]');
    const cabinetButton = target.closest('.cabinet-button-js');
    const toggleButton = target.closest('.toggle-button');
    const shelfButton = target.closest('.shelf-button-js');
    const shelfCategoryButton = target.closest('.shelf-category-js');
    const mapCell = target.closest('.map-cell');

    if (mapCell) {
        handleAreaSelection(mapCell.dataset.area);
    } else if (itemButton) {
        const action = itemButton.dataset.action;
        const type = itemButton.dataset.type;
        const path = itemButton.dataset.path;
        const index = parseInt(itemButton.dataset.index, 10);
        
        if (action === 'increase' || action === 'decrease') {
            const delta = action === 'increase' ? 1 : -1;
            const item = getItemFromData(type, path.split(','), index);
            if (item) {
                updateQuantity(item, delta);
                document.getElementById(`qty-${type}-${path.split(',').join('-')}-${index}`).value = item.qty;
            }
        } else if (action === 'archive' || action === 'delete' || action === 'permanent-delete' || action === 'restore') {
            const item = getItemFromData(type, path.split(','), index, true);
            const itemName = item?.name || 'this item';
            let title, message;
            
            if (action === 'archive') {
                title = 'Confirm Archive';
                message = `Are you sure you want to archive "${itemName}"? You can restore it later from the Archive.`;
            } else if (action === 'delete') {
                title = 'Confirm Delete';
                message = `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
            } else if (action === 'permanent-delete') {
                title = 'Confirm Permanent Delete';
                message = `Are you sure you want to PERMANENTLY delete "${itemName}"? This action cannot be undone.`;
            } else if (action === 'restore') {
                title = 'Confirm Restore';
                message = `Are you sure you want to restore "${itemName}" to its original location?`;
            }

            showConfirmationModal(title, message, () => {
                findAndManipulateItem(equipmentData, path, index, action);
            });
        }
    } else if (cabinetButton) {
        showCabinet(cabinetButton.dataset.parent, cabinetButton.dataset.mainarea, cabinetButton.dataset.cabinet);
    } else if (toggleButton) {
        const toggleType = toggleButton.dataset.toggle;
        const labName = toggleButton.dataset.lab;
        const currentState = navigationStack[navigationStack.length - 1];
        if (currentState && currentState.type === 'lab' && currentState.name === labName) {
            if (toggleType === 'basic') {
                currentState.showBasic = !currentState.showBasic;
            } else if (toggleType === 'generalLabware') {
                currentState.showGeneralLabware = !currentState.showGeneralLabware;
            }
            displayLab(labName, currentState.showBasic, currentState.showGeneralLabware);
        }
    } else if (shelfButton) {
        const { parent, subarea, shelf, nestedShelf } = shelfButton.dataset;
        if (nestedShelf) {
            showShelf(parent, subarea, nestedShelf);
        } else {
            showShelf(parent, subarea, shelf);
        }
    } else if (shelfCategoryButton) {
        showShelf(shelfCategoryButton.dataset.parent, shelfCategoryButton.dataset.subarea, 'Shelves');
    }
}

function handleQuantityChange(event) {
    const input = event.target.closest('input[type="text"]');
    if (input) {
        const type = input.dataset.type;
        const path = input.dataset.path.split(',');
        const index = parseInt(input.dataset.index, 10);
        const item = getItemFromData(type, path, index);
        if (item) {
            updateQuantity(item, input.value, true);
        }
    }
}

function getItemFromData(type, path, index, isArchiveCheck = false) {
    let list;
    if (isArchiveCheck) {
        list = archivedEquipment;
    } else {
        switch (type) {
            case 'standardBasic':
                list = standardBasicEquipment;
                break;
            case 'standardLabware':
                list = standardGeneralLabware;
                break;
            case 'basic':
                list = equipmentData[path[0]]?.basic;
                break;
            case 'cabinet':
                if (path[0] === 'Lab' || path[0] === 'Greenhouse' || path[0] === 'Bookstore' || path[0] === 'Academy') {
                    list = equipmentData[path[0]]?.cabinets?.[path[1]];
                } else if (path[0] === 'Preproom') {
                    list = equipmentData[path[0]]?.subcategories?.[path[1]]?.cabinets?.[path[2]];
                }
                break;
            case 'shelf':
                list = equipmentData[path[0]]?.subcategories?.[path[1]]?.[path[2]];
                break;
            case 'nestedShelf':
                list = equipmentData[path[0]]?.subcategories?.[path[1]]?.Shelves?.[path[2]];
                break;
            default:
                console.error('Unknown item type:', type);
                return null;
        }
    }
    return list?.[index];
}

function handleAreaSelection(area) {
    mapDiv.style.display = 'none';
    contentArea.classList.remove('hidden');

    if (area.startsWith("Lab")) {
        showLab(area);
    } else {
        switch (area) {
            case 'Preproom': showPreproom(); break;
            case 'Greenhouse': showGreenhouse(); break;
            case 'Bookstore': showBookstore(); break;
            case 'Academy': showAcademy(); break;
            default: showContent(area, `<p>Details about ${area} coming soon.</p>`); pushState({ type: 'facility', name: area }); break;
        }
    }
}

function showPreproom() {
    pushState({ type: 'main', area: 'Preproom' });
    const preproomData = equipmentData['Preproom'];
    let html = '<h3>Sections:</h3><div class="cabinet-buttons">';
    if (preproomData && preproomData.subcategories) {
        const sortedSubcategories = Object.keys(preproomData.subcategories).sort();
        sortedSubcategories.forEach(subArea => {
            html += `<button class="cabinet-button-js" data-parent="Preproom" data-mainarea="${subArea}">${subArea}</button>`;
        });
    }
    html += '</div>';
    showContent('Preproom', html);
    attachDynamicEventListeners();
}

function showSubArea(parent, subArea) {
    pushState({ type: 'subarea', parent: parent, name: subArea });
    const subAreaContent = equipmentData[parent]?.subcategories?.[subArea];
    let html = '';
    let title = subArea;

    if (parent === 'Preproom') {
        if ((subArea === 'Biology' || subArea === 'Chemistry' || subArea === 'Physics') && subAreaContent?.cabinets) {
            title = `Preproom - ${subArea}`;
            html += `<h3>${subArea} Columns:</h3><div class="cabinet-buttons">`;
            for (const cabinetName in subAreaContent.cabinets) {
                html += `<button class="cabinet-button-js" data-parent="Preproom" data-mainarea="${subArea}" data-cabinet="${cabinetName}">${cabinetName}</button>`;
            }
            html += '</div>';
        } else if (subArea === 'Chemical Store') {
            title = `Preproom - Chemical Store`;
            html += '<h3>Chemical Store Divisions:</h3><div class="cabinet-buttons">';
            for (const chemDivision of ['C1', 'C2', 'C3', 'C4']) {
                if (Array.isArray(subAreaContent[chemDivision])) {
                    html += `<button class="shelf-button-js" data-parent="Preproom" data-subarea="Chemical Store" data-shelf="${chemDivision}">${chemDivision}</button>`;
                }
            }
            if (subAreaContent.Shelves) {
                html += `<button class="shelf-category-js" data-parent="Preproom" data-subarea="Chemical Store" data-shelfcategory="Shelves">Shelves</button>`;
            }
            html += '</div>';
        }
    }

    showContent(title, html);
    attachDynamicEventListeners();
}

function showGreenhouse() {
    pushState({ type: 'main', area: 'Greenhouse' });
    const greenhouseData = equipmentData['Greenhouse'];
    let html = '<h3>Long Room with Cabinets</h3><div class="cabinet-buttons">';
    if (greenhouseData && greenhouseData.cabinets) {
        for (const cabinetName in greenhouseData.cabinets) {
            html += `<button class="cabinet-button-js" data-parent="Greenhouse" data-mainarea="Long Room" data-cabinet="${cabinetName}">${cabinetName}</button>`;
        }
    }
    html += '</div>';
    showContent('Greenhouse', html);
    attachDynamicEventListeners();
}

function showBookstore() {
    pushState({ type: 'main', area: 'Bookstore' });
    const bookstoreData = equipmentData['Bookstore'];
    let html = '';
    if (bookstoreData && bookstoreData.basic && bookstoreData.basic.length > 0) {
        html += '<h3>General Items:</h3>' + generateEquipmentListHTML(bookstoreData.basic, 'basic', ['Bookstore', 'basic']);
    }
    if (bookstoreData && bookstoreData.cabinets && Object.keys(bookstoreData.cabinets).length > 0) {
        html += '<h3>Shelves:</h3><div class="cabinet-buttons">';
        for (const cabinetName in bookstoreData.cabinets) {
            html += `<button class="cabinet-button-js" data-parent="Bookstore" data-mainarea="Main Area" data-cabinet="${cabinetName}">${cabinetName}</button>`;
        }
        html += '</div>';
    }
    showContent('Bookstore', html);
    attachDynamicEventListeners();
}

function showAcademy() {
    pushState({ type: 'main', area: 'Academy' });
    const academyData = equipmentData['Academy'];
    let html = '';
    if (academyData && academyData.basic && academyData.basic.length > 0) {
        html += '<h3>General Equipment:</h3>' + generateEquipmentListHTML(academyData.basic, 'basic', ['Academy', 'basic']);
    }
    if (academyData && academyData.cabinets && Object.keys(academyData.cabinets).length > 0) {
        html += '<h3>Cabinets:</h3><div class="cabinet-buttons">';
        for (const cabinetName in academyData.cabinets) {
            html += `<button class="cabinet-button-js" data-parent="Academy" data-mainarea="Main Room" data-cabinet="${cabinetName}">${cabinetName}</button>`;
        }
    }
    html += '</div>';
    showContent('Academy', html);
    attachDynamicEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    backBtn.addEventListener('click', goBack);
    searchBtn.addEventListener('click', () => renderState({ type: 'search' }));
    mapBtn.addEventListener('click', showMap);
    archiveBtn.addEventListener('click', showArchiveView);
    addEquipmentBtn.addEventListener('click', openAddEquipmentModal);
    closeAddEquipmentModal.addEventListener('click', () => addEquipmentModal.style.display = 'none');
    selectLocation.addEventListener('change', () => {
        const location = selectLocation.value;
        populateDynamicSelect(location);
        selectDynamic.value = '';
        dynamicContainer.classList.add('hidden');
        selectSubDynamic.innerHTML = '<option value="">Select an option</option>';
        subDynamicContainer.classList.add('hidden');
        if (location) dynamicContainer.classList.remove('hidden');
    });
    selectDynamic.addEventListener('change', () => {
        const location = selectLocation.value;
        const dynamicSelection = selectDynamic.value;
        populateSubDynamicSelect(location, dynamicSelection);
        subDynamicContainer.classList.add('hidden');
        if (location === 'Preproom' && ['Biology', 'Chemistry', 'Physics', 'Chemical Store'].includes(dynamicSelection)) {
            subDynamicContainer.classList.remove('hidden');
        }
    });
    addEquipmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const location = selectLocation.value;
        const dynamicSelection = selectDynamic.value;
        const subDynamicSelection = selectSubDynamic.value;
        const name = equipmentNameInput.value.trim();
        let quantity = equipmentQuantityInput.value.trim();
        if (name && quantity) {
            if (!isNaN(quantity) && !isNaN(parseFloat(quantity))) {
                quantity = parseInt(quantity, 10);
            }
            addEquipment(location, dynamicSelection, subDynamicSelection, name, quantity);
            addEquipmentModal.style.display = 'none';
            addEquipmentForm.reset();
        } else {
            showCustomModal('Error', 'Please fill in all required fields.', 'error');
        }
    });
    mapDiv.addEventListener('click', (event) => {
        const cell = event.target.closest('.map-cell');
        if (cell) {
            handleAreaSelection(cell.dataset.area);
        }
    });
    showWelcome();
});

function openAddEquipmentModal() {
    addEquipmentModal.style.display = 'flex';
    populateLocationSelect();
    selectLocation.value = '';
    selectDynamic.innerHTML = '<option value="">Select an option</option>';
    dynamicContainer.classList.add('hidden');
    selectSubDynamic.innerHTML = '<option value="">Select an option</option>';
    subDynamicContainer.classList.add('hidden');
    equipmentNameInput.value = '';
    equipmentQuantityInput.value = '';
}

function populateLocationSelect() {
    selectLocation.innerHTML = '<option value="">Select a location</option>';
    const allLocations = Object.keys(equipmentData).sort();
    allLocations.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        selectLocation.appendChild(option);
    });
}

function populateDynamicSelect(location) {
    selectDynamic.innerHTML = '<option value="">Select an option</option>';
    dynamicLabel.textContent = 'Cabinet/Section:';
    const data = equipmentData[location];
    if (!data) return;

    if (location.startsWith('Lab')) {
        const labOptions = [];
        if (data.basic) {
            labOptions.push({ value: 'General Items', text: 'General Items (No specific cabinet)' });
        }
        if (data.cabinets) {
            Object.keys(data.cabinets).sort().forEach(cabinet => {
                labOptions.push({ value: cabinet, text: cabinet });
            });
        }
        
        labOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            selectDynamic.appendChild(option);
        });
        
    } else if (location === 'Preproom' && data.subcategories) {
        dynamicLabel.textContent = 'Section:';
        const sortedSubcategories = Object.keys(data.subcategories).sort();
        sortedSubcategories.forEach(subcatName => {
            const option = document.createElement('option');
            option.value = subcatName;
            option.textContent = subcatName;
            selectDynamic.appendChild(option);
        });
    } else if (['Greenhouse', 'Bookstore', 'Academy'].includes(location)) {
        dynamicLabel.textContent = 'Cabinet/Shelf:';
        if (data.basic && Array.isArray(data.basic)) {
            const option = document.createElement('option');
            option.value = 'General Items';
            option.textContent = 'General Items (No specific cabinet)';
            selectDynamic.appendChild(option);
        }
        if (data.cabinets) {
            Object.keys(data.cabinets).sort().forEach(cabinet => {
                const option = document.createElement('option');
                option.value = cabinet;
                option.textContent = cabinet;
                selectDynamic.appendChild(option);
            });
        }
    }
}

function populateSubDynamicSelect(location, dynamicSelection) {
    selectSubDynamic.innerHTML = '<option value="">Select an option</option>';
    subDynamicLabel.textContent = 'Column/Shelf:';
    if (location === 'Preproom') {
        const subcatData = equipmentData[location]?.subcategories?.[dynamicSelection];
        if (subcatData?.cabinets) {
            subDynamicLabel.textContent = 'Column:';
            Object.keys(subcatData.cabinets).sort().forEach(cabinetName => {
                const option = document.createElement('option');
                option.value = cabinetName;
                option.textContent = cabinetName;
                selectSubDynamic.appendChild(option);
            });
        } else if (dynamicSelection === 'Chemical Store' && subcatData) {
            subDynamicLabel.textContent = 'Shelf:';
            const chemicalStoreOptions = ['C1', 'C2', 'C3', 'C4'];
            chemicalStoreOptions.forEach(chemDivision => {
                const option = document.createElement('option');
                option.value = chemDivision;
                option.textContent = chemDivision;
                selectSubDynamic.appendChild(option);
            });
            if (subcatData.Shelves) {
                Object.keys(subcatData.Shelves).sort().forEach(shelfName => {
                    const option = document.createElement('option');
                    option.value = shelfName;
                    option.textContent = shelfName;
                    selectSubDynamic.appendChild(option);
                });
            }
        }
    }
}