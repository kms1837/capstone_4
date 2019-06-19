//
//  SpackVC.swift
//  Capstone
//
//  Created by 유지훈 on 31/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class SpackVC: UIViewController {

    @IBOutlet weak var uploadBTN: UIButton!

    @IBOutlet weak var spectype: UITextField!
    
    @IBOutlet weak var specname: UITextField!
    
    @IBOutlet weak var specexplain: UITextView!
    
    @IBOutlet weak var filename: UILabel!
    
    let picker = UIImagePickerController()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        picker.delegate = self

        // Do any additional setup after loading the view.
        
    }
  
    @IBAction func Addfile(_ sender: Any) {
        
        let alert =  UIAlertController(title: "증빙 자료", message: "둘중 하나를 선택해주세요", preferredStyle: .actionSheet)
        
        
        let library =  UIAlertAction(title: "사진앨범", style: .default) { (action) in self.openLibrary()
            
        }
        
        
        let camera =  UIAlertAction(title: "카메라", style: .default) { (action) in
            
            self.openCamera()
            
        }
        
        
        let cancel = UIAlertAction(title: "취소", style: .cancel, handler: nil)
        
        
        alert.addAction(library)
        
        alert.addAction(camera)
        
        alert.addAction(cancel)
        
        present(alert, animated: true, completion: nil)
        
        
        
        
        
    }
    

    @IBAction func speckRQBTN(_ sender: Any) {
        
        

        var SPname = specname.text
        var SPtype = spectype.text
        
        let item: Spec = Spec(SPname!,SPtype!,"2019.6.7","승인 대기중")
        
        
        SpecList.append(item)
        

       // displayMyAlertMessage(userMessage:"요청 완료")
        
        self.dismiss(animated: true, completion: nil)
        
    }

    
    func openLibrary(){
        
        picker.sourceType = .photoLibrary
        
        present(picker, animated: false, completion: nil)
        
    }
    
    func openCamera(){
        
        if(UIImagePickerController .isSourceTypeAvailable(.camera)){
            
            picker.sourceType = .camera
            
            present(picker, animated: false, completion: nil)
            
        }
            
        else{
            
            print("카메라 사용 불가")
            
        }
        
    }
    
    
  
    
    @IBAction func backbtn(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    func displayMyAlertMessage(userMessage:String){
        var myAlert = UIAlertController(title:"스펙 추가", message:
            userMessage, preferredStyle:
            UIAlertController.Style.alert);
        
        let okAction = UIAlertAction(title:"ok", style:
            UIAlertAction.Style.default, handler:nil);
        
        myAlert.addAction(okAction);
        
        self.present(myAlert, animated: true, completion: nil);
        
        
    }
    
   func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        
    if let imageUrl = info[UIImagePickerController.InfoKey.referenceURL] as? URL{
        
        //displayMyAlertMessage(userMessage:"파일 첨부 완료!!")
        filename.text = "파일 첨부 완료"
            print(info)
            
        }
        
        dismiss(animated: true, completion: nil)
        
    }
    
  
    
}
extension SpackVC: UIImagePickerControllerDelegate, UINavigationControllerDelegate{
    
    
    
    
}
