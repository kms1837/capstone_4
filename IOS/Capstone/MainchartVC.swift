//
//  MainchartVC.swift
//  Capstone
//
//  Created by 유지훈 on 15/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit
import DDSpiderChart

class MainchartVC: UIViewController {

    

    @IBOutlet weak var Profileimage: UIImageView!
    
    @IBOutlet weak var radarchart: DDSpiderChartView!

    @IBOutlet weak var RankStatus: UILabel!
    
    @IBOutlet weak var ProfileBox: UIView!
    
    @IBOutlet weak var receiveSN: UILabel!
//    var receiveSTData2: String?

    
    @IBOutlet weak var StatusBox: UIView!
    
    @IBOutlet weak var sangseBTN: UIButton!
    
    
    var students = [String : Any]()
    
    //아이디 ,비번 배열
    
    var id = [String]()
 
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        sangseBTN.layer.cornerRadius = 8
        sangseBTN.layer.shadowColor = UIColor.darkGray.cgColor
        sangseBTN.layer.shadowOffset = CGSize(width: 0, height: 1)
        sangseBTN.layer.shadowRadius = 2
        sangseBTN.layer.shadowOpacity = 1
        sangseBTN.layer.masksToBounds = false
        
        
        
        Profileimage.layer.shadowColor = UIColor.darkGray.cgColor
        Profileimage.layer.shadowOffset = CGSize(width: 0, height: 1)
        Profileimage.layer.shadowRadius = 2
        Profileimage.layer.shadowOpacity = 1
        Profileimage.layer.masksToBounds = false
        
        
        
        
        
        //ProfileBox.backgroundColor = UIColor.crimsonRed
        //ProfileBox.layer.cornerRadius = 9
        ProfileBox.layer.masksToBounds = true

        /*
        //그림자
        ProfileBox.layer.shadowColor = UIColor.darkGray.cgColor
        ProfileBox.layer.shadowOffset = CGSize(width: 0, height: 1)
        ProfileBox.layer.shadowRadius = 2
        ProfileBox.layer.shadowOpacity = 1
        ProfileBox.layer.masksToBounds = false
        */
        
        
//        StatusBox.backgroundColor = UIColor(red: 232/255, green: 232/255, blue: 232/255, alpha: 0.5)
        StatusBox.backgroundColor = UIColor.white
        StatusBox.layer.cornerRadius = 9
        StatusBox.layer.masksToBounds = true
        //그림자
        StatusBox.layer.shadowColor = UIColor.darkGray.cgColor
        StatusBox.layer.shadowOffset = CGSize(width: 0, height: 1)
        StatusBox.layer.shadowRadius = 2
        StatusBox.layer.shadowOpacity = 1
        StatusBox.layer.masksToBounds = false

        Profileimage.image = UIImage(named: "16013080")
        setNavigationBarTitle()
        
        
        //json파일 복사
        let path = Bundle.main.path(forResource: "logdata", ofType: "json")
        if let data = try? String(contentsOfFile: path!).data(using: .utf8){
            
            let json = try! JSONSerialization.jsonObject(with: data!, options: []) as! [String : Any]
            
            
            //print(json)
            
            students = json
            
        }
        if let student = students["student"]as? [[String: Any]]{
            
            for studentIndex in student{
                id.append(studentIndex["userid"] as! String)
                
                //userRank.append(studentIndex["Rank"] as! String)
                //usergrade.append(studentIndex["Grade"] as! String)
                //userCoding.append(studentIndex["Coding"] as! String)
                //userMath.append(studentIndex["Math"] as! String)
                //userTeamwork.append(studentIndex["Teamwork"] as! String)
                //useractivity.append(studentIndex["Activity"] as! String)

            }
        }

        
//        var flag1 = 0
        var myturn: Int = 0
        for i in 0..<students.count{
            let userIdStored = id[i];
            
            if(userIdStored == "16013080"){
//                flag1 = 1
                myturn = i
                break
            }
        }
        
  
        //let s1 = Float(userMath[myturn])
        //let s2 = Float(usergrade[myturn])
        //let s3 = Float(userTeamwork[myturn])
        //let s4 = Float(userCoding[myturn])

        
        radarchart.axes = ["MATH", "SPEC", "GRADE", "TEAMPLE", "CODING"] // Set axes by giving their labels
//        radarchart.addDataSet(values: [s1!, 3.7, s2!, s3!, s4! ], color: .red)
        radarchart.addDataSet(values: [Float(0.367*2.0), Float(0.37*2.0), Float(0.365*2.0), Float(0.45*2.0), Float(0.359*2.0) ], color: .red)
        
        
        radarchart.color = .gray // This will change the color of the circles
        radarchart.circleCount = 25 // How many circles there will be
        radarchart.circleGap = 4 // The distance between circles
        // circleCount * circleGap would be the radius of the chart itself
        
        
        
        /*  tabbar로 부터 데이터 받기
        var tabbar = tabBarController as! TabbarViewController
        receiveSN.text = String(describing: tabbar.receiveSTData)
        */
        
        
        
        
        
        
    }
    @IBAction func MainDetailAction(_ sender: Any) {
        
//        MainDetailBTN.title = "상세보기"
//        MainDetailBTN.action.
        let storyboard: UIStoryboard = self.storyboard!
        let nextView = storyboard.instantiateViewController(withIdentifier: "MainDetailVC")
        
        present(nextView, animated: true, completion: nil)

    
    }
    
    
    func setNavigationBarTitle() {
        let image = UIImage(named: "navilogo")
        navigationItem.titleView = UIImageView(image: image)
    }

    
    /*
    func dropShadow(color: UIColor, offSet: CGSize, opacity: Float, radius: CGFloat) {
        
        // 그림자 색상 설정
        layer.shadowColor = color.cgColor
        // 그림자 크기 설정
        layer.shadowOffset = offSet
        // 그림자 투명도 설정
        layer.shadowOpacity = opacity
        // 그림자의 blur 설정
        layer.shadowRadius = radius
        // 구글링 해보세요!
        
        
        UIView.masksToBounds = false
    }
    */
    
    
    func attributedAxisLabel(_ label: String) -> NSAttributedString {
        let attributedString = NSMutableAttributedString()
        attributedString.append(NSAttributedString(string: label, attributes: [NSAttributedString.Key.foregroundColor: UIColor.black, NSAttributedString.Key.font: UIFont(name: "AvenirNextCondensed-Bold", size: 10)!]))
        return attributedString
    }
}
