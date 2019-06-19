//
//  MainDetailVC.swift
//  Capstone
//
//  Created by 유지훈 on 24/05/2019.
//  Copyright © 2019 유지훈. All rights reserved.
//

import UIKit

class MainDetailVC: UIViewController {

  //  @IBOutlet weak var backBTN: UIBarButtonItem!

    @IBOutlet weak var View1: UIView!
    @IBOutlet weak var MyAvggrade: UILabel!
    
    @IBOutlet weak var View2: UIView!
    @IBOutlet weak var SWAvggrade: UILabel!
    
    @IBOutlet weak var View3: UIView!
    @IBOutlet weak var SWTenAvg: UILabel!
    
    
    @IBOutlet weak var TrackCV: UICollectionView!
    
    var trackList2: [MainTrack] = []
    let collenctionviewXIBName: String = "TrackCVC"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //박스 1모양
        View1.backgroundColor = UIColor.white
        View1.layer.cornerRadius = 9
        View1.layer.masksToBounds = true
        
        //그림자
        View1.layer.shadowColor = UIColor.darkGray.cgColor
        View1.layer.shadowOffset = CGSize(width: 0, height: 1)
        View1.layer.shadowRadius = 2
        View1.layer.shadowOpacity = 1
        View1.layer.masksToBounds = false
        
        //박스 2모양
        View2.backgroundColor = UIColor.white
        View2.layer.cornerRadius = 9
        View2.layer.masksToBounds = true
        
        //그림자
        View2.layer.shadowColor = UIColor.darkGray.cgColor
        View2.layer.shadowOffset = CGSize(width: 0, height: 1)
        View2.layer.shadowRadius = 2
        View2.layer.shadowOpacity = 1
        View2.layer.masksToBounds = false
        
        //박스 3모양
        View3.backgroundColor = UIColor.white
        View3.layer.cornerRadius = 9
        View3.layer.masksToBounds = true
        
        //그림자
        View3.layer.shadowColor = UIColor.darkGray.cgColor
        View3.layer.shadowOffset = CGSize(width: 0, height: 1)
        View3.layer.shadowRadius = 2
        View3.layer.shadowOpacity = 1
        View3.layer.masksToBounds = false

        
        
        
        
        /*
        let nib = UINib(nibName: "TrackCVC", bundle: nil)
        let nibName = UINib(nibName: "TrackCVC", bundle: nil)
        print("nib 성공\n");
        TrackCV.register(nib, forCellWithReuseIdentifier: "ReuseTrackCVC")

        */
        
        //registerCVC()
        let nibN = UINib(nibName: collenctionviewXIBName, bundle: nil)
        
        TrackCV.register(nibN, forCellWithReuseIdentifier: collenctionviewXIBName)

        SetData()
        TrackCV.dataSource = self
 
        TrackCV.delegate = self
        
    }
    

    
    
    
    @IBAction func backBTN(_ sender: Any) {
         self.dismiss(animated: true, completion: nil)
    }
    
}
extension MainDetailVC: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
  //      print("카운트 값 %d\n",trackList2.count)
        return trackList2.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: collenctionviewXIBName, for: indexPath) as! TrackCVC
        
//        print("TrackCVC test1\n")

        let track = trackList2[indexPath.row]
        
        cell.TrackName2.text = track.trackname
        cell.AvgGrade.text = track.trackscore
        
        //코너 둥글게
        cell.backgroundColor = UIColor.white
        cell.layer.cornerRadius = 9
        cell.layer.masksToBounds = true
        
        //그림자
        cell.layer.shadowColor = UIColor.darkGray.cgColor
        cell.layer.shadowOffset = CGSize(width: 0, height: 1)
        cell.layer.shadowRadius = 2
        cell.layer.shadowOpacity = 1
        cell.layer.masksToBounds = false
        

        return cell
        
    }
    
    
    
    
}


// UICollectionViewDelegate 를 채택합니다.
extension MainDetailVC: UICollectionViewDelegate {
    

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
//        let dvc = storyboard?.instantiateViewController(withIdentifier: collenctionviewXIBName) as! TrackDetailVC
        
        let dvc = storyboard?.instantiateViewController(withIdentifier: "TrackDetailVC") as! TrackDetailVC
        
        
        let track = trackList2[indexPath.row]
        
        //dvc.AvgGrade.text = track.trackscore
        //dvc.TrackName2.text = track.trackname
        
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
        
        navigationController?.pushViewController(dvc, animated: true)
    }
  
}

extension MainDetailVC: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        let width: CGFloat = (view.frame.width - 48) / 3
        let height: CGFloat = (width)
        
        return CGSize(width: width, height: height)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        
        return 12
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 12
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        
        return UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
    }
}


extension MainDetailVC {
    func SetData(){
        let Track1 = MainTrack("3.5","시스템 응용")
        let Track2 = MainTrack("0","사물 인터넷")
        let Track3 = MainTrack("3.3","멀티미디어")
        let Track4 = MainTrack("3.0","HCI&비주얼컴퓨팅")
        let Track5 = MainTrack("4.0","지능형 인지")
        let Track6 = MainTrack("3.5","인공지능")
        let Track7 = MainTrack("3.5","가상현실")
        let Track8 = MainTrack("4.0","응용 소프트웨어")
        let Track9 = MainTrack("3.0","정보보호학과")
        let Track10 = MainTrack("0","데이터 사이언스")
        
        trackList2 = [Track1, Track2, Track3, Track4, Track5, Track6, Track7, Track8, Track9, Track10]
    }
}




