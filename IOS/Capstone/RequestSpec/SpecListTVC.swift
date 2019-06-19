//
//  SpecListTVC.swift
//  Capstone
//
//  Created by 유지훈 on 06/06/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit
var SpecList: [Spec] = []

class SpecListTVC: UIViewController {

  //  let doneButton = UIBarButtonItem(barButtonSystemItem: .done, target: nil, action: #selector(doneButtonTap))
    
    @IBOutlet weak var spectable: UITableView!
    
    @IBOutlet weak var EditButton: UIBarButtonItem!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    //    doneButton.style = .plain
    //    doneButton.target = self
        
        
        
        
        //xib 시 코드를 추가해 주어야한다
        let nibName = UINib(nibName: "SpecCell", bundle: nil)
        
        //register에 등록해준다  외부매개변수를 안쓸거야
        spectable.register(nibName, forCellReuseIdentifier: "SpecCell")
        
        setdata()
        
        spectable.dataSource = self
        spectable.delegate = self
        

        
    }
    override func viewDidAppear(_ animated: Bool) {
        spectable.reloadData()
    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        
        if let index = spectable.indexPathForSelectedRow {
            spectable.deselectRow(at: index, animated: true)
        }
    }

    

    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        SpecList.remove(at: indexPath.row)
        spectable.reloadData()
    }
    
    @IBAction func editBTN(_ sender: Any) {

        if spectable.isEditing {
            EditButton.title = "Edit"
            spectable.setEditing(false, animated: true)
        } else {
            EditButton.title = "Done"
            spectable.setEditing(true, animated: true)
        }

    }
  
    
    
    /*
    //donetap
    @objc func doneButtonTap() {
        self.navigationItem.leftBarButtonItem = editButtonItem
        spectable.setEditing(false, animated: true)
    }
*/
}

extension SpecListTVC: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return SpecList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = spectable.dequeueReusableCell(withIdentifier: "SpecCell") as! SpecCell
        
        let spec = SpecList[indexPath.row]
        
        //데이터 넣기
        cell.specname.text = spec.SpecName
        cell.spectype.text = spec.SpecType
        cell.specdate.text = spec.SpecDate
        cell.specrequest.text = spec.SpecRequest
        if(spec.SpecRequest == "승인 완료"){
            cell.specrequest.textColor = .green
        }
    
        
        return cell
    }
}
extension SpecListTVC {
    func setdata(){
        let spec1 = Spec("정보처리기사","자격증","2019.5.18","승인 완료")
        let spec2 = Spec("창의설계경진대회","공모전","2019.6.1","승인 대기중")
        
        SpecList = [spec1, spec2]
    }
}

//크기 조정
extension SpecListTVC: UITableViewDelegate{
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return CGFloat(85)
    }
    
    
    func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        
        return true
    }
    
    func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        
        let movingIndex = SpecList[sourceIndexPath.row]
        
        SpecList.remove(at: sourceIndexPath.row)
        SpecList.insert(movingIndex, at: destinationIndexPath.row)
    }
    /*
     commit editingStyle 은 테이블뷰가 edit 된 스타일에 따라 이벤트를 설정할 수 있습니다.
     여기서는 editing mode 에서 한개의 row 를 delete 하였을 경우에 대한 동작을 설정하였습니다.
     */
    
    /*
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            SpecList.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
        }
    }
    */
    
}

