//
//  GraduateTVC.swift
//  Capstone
//
//  Created by 유지훈 on 30/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class GraduateTVC: UITableViewCell {

    
    //티어 + 모양도 바꿔주자
 
    
    @IBOutlet weak var Rank: UILabel!
    
    //점수들
    @IBOutlet weak var TVCgrade: UILabel!
    
    @IBOutlet weak var TVCcoding: UILabel!
    
    @IBOutlet weak var TVCmath: UILabel!
    
    @IBOutlet weak var TVCteample: UILabel!
    
    @IBOutlet weak var TVCactivity: UILabel!
    
    
    //자신의 랭크 + 자신의 성적과 최대한 비슷한 졸업생들이 간 직군 대표적 3개

    
    @IBOutlet weak var job: UILabel!
    

    
    
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
    

        
        // Initialization code
    }

    
    
    
    
    
    
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
