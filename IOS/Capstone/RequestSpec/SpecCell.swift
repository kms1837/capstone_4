//
//  SpecCell.swift
//  Capstone
//
//  Created by 유지훈 on 06/06/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class SpecCell: UITableViewCell {

    @IBOutlet weak var specname: UILabel!
    
    @IBOutlet weak var spectype: UILabel!
    
    @IBOutlet weak var specdate: UILabel!
        
    @IBOutlet weak var specrequest: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
