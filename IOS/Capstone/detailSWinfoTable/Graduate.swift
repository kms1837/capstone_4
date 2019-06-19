//
//  Graduate.swift
//  Capstone
//
//  Created by 유지훈 on 30/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import Foundation

struct Graduate {
    var GRURank: String
    
    var GRUgrade: String
    var GRUcoding: String
    var GRUmath: String
    var GRUteample: String
    var GRUactivity: String
    var GRUjob: String
    
    //_의 의미를 알자
    init(_ GRURank: String,_ GRUgrade: String, _ GRUcoding: String, _ GRUmath: String, _ GRUteample: String,_ GRUactivity: String,_ GRUjob: String){
        
        self.GRURank = GRURank
        self.GRUgrade = GRUgrade
        self.GRUcoding = GRUcoding
        self.GRUmath = GRUmath
        self.GRUteample = GRUteample
        self.GRUactivity = GRUactivity
        self.GRUjob = GRUjob
 
        
    }
    
}
