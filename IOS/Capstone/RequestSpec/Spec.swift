//
//  Spec.swift
//  Capstone
//
//  Created by 유지훈 on 06/06/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import Foundation

struct Spec {

    var SpecName: String
    var SpecType: String
    var SpecDate: String
    var SpecRequest: String

    
    //_의 의미를 알자
    init(_ spname: String,_ sptype: String,_ spdate: String,_ sprequest: String){
            self.SpecName = spname
            self.SpecType = sptype
            self.SpecDate = spdate
            self.SpecRequest = sprequest
    }
}
