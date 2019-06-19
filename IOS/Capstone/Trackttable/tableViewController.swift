//
//  tableViewController.swift
//  Capstone
//
//  Created by 유지훈 on 20/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class tableViewController: UIViewController, UIScrollViewDelegate {

  //  @IBOutlet weak var pagecontroller: UIPageControl!
    
  //  @IBOutlet weak var scrollview: UIScrollView!
    
    @IBOutlet weak var TrackTable: UITableView!
    
    
    //let TrackimageList = ["track1","track2","track3"]
    
    
    var TrackList: [Track] = []

    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        /*
        //이미지 슬라이드
        pagecontroller.numberOfPages = TrackimageList.count
        
        for i in 0..<TrackimageList.count{
            let imageview = UIImageView()
            imageview.contentMode = .scaleToFill
            imageview.image = UIImage(named: TrackimageList[i])
            let xPos = CGFloat(i)*self.view.bounds.size.width
            imageview.frame = CGRect(x: xPos, y:0, width: view.frame.size.width, height: scrollview.frame.size.height)
            scrollview.contentSize.width = view.frame.size.width*CGFloat(i+1)
            scrollview.addSubview(imageview)
        }
        */
        
        //xib 시 코드를 추가해 주어야한다
        let nibName = UINib(nibName: "TrackTVC", bundle: nil)
        
        //register에 등록해준다  외부매개변수를 안쓸거야
        TrackTable.register(nibName, forCellReuseIdentifier: "TrackTVC")
        
        setData()
        
        TrackTable.dataSource = self
        TrackTable.delegate = self

        
    }
    
    //스크롤 뷰
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let page = scrollView.contentOffset.x/scrollView.frame.width
        
    //    pagecontroller.currentPage = Int(page)
        
        
    }
    
    
}
extension tableViewController: UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return TrackList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = TrackTable.dequeueReusableCell(withIdentifier: "TrackTVC") as! TrackTVC
        
        let track = TrackList[indexPath.row]
        
        cell.TrackName.text = track.title
        //cell.TrackExplane.text = track.contents
        
        return cell
    }
}
extension tableViewController {
    func setData(){
        let track1 = Track("시스템 응용")
        let track2 = Track("사물 인터넷")
        let track3 = Track("멀티미디어")
        let track4 = Track("HCI&비주얼컴퓨팅")
        let track5 = Track("지능형 인지")
        let track6 = Track("인공지능")
        let track7 = Track("가상현실")
        let track8 = Track("응용 소프트웨어")
        let track9 = Track("정보보호학과")
        let track10 = Track("데이터 사이언스")

        TrackList = [track1, track2, track3, track4, track5, track6, track7, track8, track9, track10]
    }
}

extension tableViewController: UITableViewDelegate {
    /*
     didSelectRowAt 은 셀을 선택했을때 어떤 동작을 할 지 설정할 수 있습니다.
     여기서는 셀을 선택하면 그에 해당하는 MusicDetailVC 로 화면전환을 합니다.
     */
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // 아래의 과정들은 1, 2차 세미나의 화면 전환 간 데이터 전달과 같습니다.
        let dvc = storyboard?.instantiateViewController(withIdentifier: "TrackDetailVC") as! TrackDetailVC
        
        // 맨 아래 extension 에 musicList 배열에 저장하는 부분이 있습니다.
        // 해당하는 인덱스의 Model 을 저장합니다.
        let track  = TrackList[indexPath.row]

        //n번 트랙 값 전달 받기 (평균 점수, 상위 10프로, 자기 점수)
        //시스템 트랙
        if(indexPath.row == 0){
         dvc.TrackName = "시스템 응용"
         dvc.myavggrade = "9"
         dvc.swavggrade = "15"
         dvc.sw10avggrade = "18"
            
         dvc.ThreeGrade = [2.75, 3.83, 3.5]
            
        }else if(indexPath.row == 1){
            dvc.TrackName = "사물 인터넷"
            dvc.myavggrade = "0"
            dvc.swavggrade = "12"
            dvc.sw10avggrade = "18"

            dvc.ThreeGrade = [3.05, 3.54, 0]

        }else if(indexPath.row == 2){
            dvc.TrackName = "멀티미디어"
            dvc.myavggrade = "12"
            dvc.swavggrade = "18"
            dvc.sw10avggrade = "23"
            dvc.ThreeGrade = [3.34, 3.9, 3.7]

        }else if(indexPath.row == 3){
            dvc.TrackName = "HCI&비주얼컴퓨팅"
            dvc.myavggrade = "3"
            dvc.swavggrade = "14"
            dvc.sw10avggrade = "18"
            dvc.ThreeGrade = [3.2, 3.8, 3.0]

        }else if(indexPath.row == 4){
            dvc.TrackName = "지능형 인지"
            dvc.myavggrade = "3"
            dvc.swavggrade = "15"
            dvc.sw10avggrade = "21"
            dvc.ThreeGrade = [3.4, 4.1, 4.0]

        }else if(indexPath.row == 5){
            dvc.TrackName = "인공지능"
            dvc.myavggrade = "6"
            dvc.swavggrade = "12"
            dvc.sw10avggrade = "15"
            dvc.ThreeGrade = [3.34, 4.0, 3.5]

        }else if(indexPath.row == 6){
            dvc.TrackName = "가상현실"
            dvc.myavggrade = "3"
            dvc.swavggrade = "12"
            dvc.sw10avggrade = "15"
            dvc.ThreeGrade = [3.29, 4.1, 3.5]

        }else if(indexPath.row == 7){
            dvc.TrackName = "응용 소프트웨어"
            dvc.myavggrade = "3"
            dvc.swavggrade = "15"
            dvc.sw10avggrade = "22"
            dvc.ThreeGrade = [3.16, 3.89, 4.0]

        }else if(indexPath.row == 8){
            dvc.TrackName = "정보 보호"
            dvc.myavggrade = "3"
            dvc.swavggrade = "9"
            dvc.sw10avggrade = "13"
            dvc.ThreeGrade = [3.13, 3.8, 3.0]

        }else if(indexPath.row == 9){
            dvc.TrackName = "데이터 사이언스"
            dvc.myavggrade = "0"
            dvc.swavggrade = "15"
            dvc.sw10avggrade = "18"
            dvc.ThreeGrade = [3.24, 3.74, 0]

        }

        
        
        // push 방식으로 화면을 전환합니다.
        navigationController?.pushViewController(dvc, animated: true)
        
        
        
        
        
        
    };
    func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        
        return true
    }
    
    /*
     moveRowAt은 테이블 뷰의 row 의 위치가 변화하였을 때, 원하는 작업을 해줄 수 있습니다.
     지금 이 프로젝트에서는 editing mode 에서 row 를 변화 시킴에 따라 이 함수가 실행됩니다.
     */
    func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        
        /*
         테이블 뷰 의 row 를 변화시키면 그에 따라 대응되는 모델(데이터)도 변화시켜주어야 합니다.
         sourceIndexPath와 destinationIndexPath를 통해 이동을 시작한 index와 새롭게 설정된 index를 가져올 수 있습니다.
         */
        let movingIndex = TrackList[sourceIndexPath.row]
        
        TrackList.remove(at: sourceIndexPath.row)
        TrackList.insert(movingIndex, at: destinationIndexPath.row)
    }
    /*
     commit editingStyle 은 테이블뷰가 edit 된 스타일에 따라 이벤트를 설정할 수 있습니다.
     여기서는 editing mode 에서 한개의 row 를 delete 하였을 경우에 대한 동작을 설정하였습니다.
     */
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            TrackList.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
        }
    }
}
