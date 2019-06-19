//
//  LoginViewController.swift
//  Capstone
//
//  Created by 유지훈 on 30/04/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {

    var students = [String : Any]()
    
    //아이디 ,비번 배열
    var id = [String]()
    var pw = [String]()
    

    @IBOutlet weak var logtext: UITextField!
    
    @IBOutlet weak var passtext: UITextField!
    
    @IBOutlet weak var logbt: UIButton!
    
    
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let path = Bundle.main.path(forResource: "logdata", ofType: "json")
        if let data = try? String(contentsOfFile: path!).data(using: .utf8){
            
            let json = try! JSONSerialization.jsonObject(with: data!, options: []) as! [String : Any]
            
            
            //print(json)
            
            students = json
            
        }
        if let student = students["student"]as? [[String: Any]]{

            for studentIndex in student{
                id.append(studentIndex["userid"] as! String)
                pw.append(studentIndex["userpw"] as! String)

            }
        }

        

    }
    
    
    @IBAction func loginButton(_ sender: Any) {
      
        let userID = logtext.text
        let userPW = passtext.text
        var flag: Int = 0
        
    //    for i in 0..<students.count{
       for i in 0..<students.count{
            let userIdStored = id[i];
            let userPwStored = pw[i];

            if(userIdStored == userID && userPwStored == userPW){
               flag = 1
            }
        }
        if(flag == 1){
            //view 이동
            let storyboard: UIStoryboard = self.storyboard!
            let nextView = storyboard.instantiateViewController(withIdentifier: "TabBarView")
            
            //데이터값 전달
            guard let chartView = storyboard.instantiateViewController(withIdentifier: "TabBarView") as? TabbarViewController  else { return }
            let check = !(userID?.isEmpty ?? true)
            
            if check {
                chartView.receiveSTData = logtext.text
            }
            
            //view 전환
            present(nextView, animated: true, completion: nil)

        }else{
            displayMyAlertMessage(userMessage:" 로그인 실패 ")
        }
        
    }
    func displayMyAlertMessage(userMessage:String){
        var myAlert = UIAlertController(title:"Message", message:
            userMessage, preferredStyle:
            UIAlertController.Style.alert);
        
        let okAction = UIAlertAction(title:"ok", style:
            UIAlertAction.Style.default, handler:nil);
        
        myAlert.addAction(okAction);
        
        self.present(myAlert, animated: true, completion: nil);
        
        
    }
    

}
