//
//  MainTrack.swift
//  Capstone
//
//  Created by 유지훈 on 24/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import Foundation

struct MainTrack {
    var trackscore: String
    var trackname: String
    
    //_의 의미를 알자
    init(_ trackScore: String,_ trackName: String){
        
        self.trackscore = trackScore
        self.trackname = trackName
    }
}
