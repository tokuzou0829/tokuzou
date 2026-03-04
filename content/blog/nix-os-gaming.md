---
title: "ゼロから始めるNixOS + Windowsで快適異世界(systemd-boot)ゲーミングライフ"
description: "NixOSデュアルブートで快適NixOS生活！"
date: "2025-12-24"
---

:::note
このブログは、Zennでも公開されています。
[https://zenn.dev/tokuzou0829/articles/828fe9ebdb1a39](https://zenn.dev/tokuzou0829/articles/828fe9ebdb1a39)
:::

## 要約

長くなるのでやったことを簡単にまとめておきます

```
NixOSのライブ環境を起動する時は引数にnomodesetをつける
↓
インストールした後の最初の起動も引数にnomodesetが必要
↓
セキュアブートのためにWindowsの初期ブート領域の容量である100MBから拡張するためにパーティションを作り直し
↓
パーティションを作り直したことで壊れたブートローダーを復元
↓
ついに快適なゲーミングライフを手にする
```

## なぜやろうと思ったのか...?

冬の寒い時期になって彼女が欲しいなぁとか思いながら過ごしていましたが、出来そうにないので、とりあえずNixOSを入れるところから始めてみることにしました....
僕は普段Windowsでゲームをしているのですが、どうやらLinuxでも動くものが多くなってきたらしい(SteamのProtonなどの力で...)ので、最近のWindowsの不安定さから脱出するためにNixOSに乗り換えよう！と思ったのですが、ValorantというゲームをするためにはWindowsを使う必要があったので、今回はWindowsとデュアルブートすることにしました。

## 初期構成

- WIndows11 のみの入ったPC
  - ASUSのマザボ
  - SSD 2TB
  - RAM 32GB
  - GPU RTX3080

ざっとこんな感じ

## 1.パーティションを作った

僕の環境にSSDは一枚しかなかったため、今使ってるWindowsからパーティションを切り出す必要がありました。困りました.....とりあえず、ディスクを管理から適当にWindowsのパーティションを切って空のパーティションを作りました。

## 2.NixOSのライブ環境を起動

事前に作っておいたNixOSのインストールUSBからブートしてみました。が.....なぜか画面が映りません。困りました.....Gemini先生によると、どうやら僕の使っているRTX3080とデフォルトで使用される`nouveau`というグラフィックドライバーは相性が悪いようで、NixOSのライブ環境を起動する構成を選ぶ画面で引数を指定する必要があるようです。
具体的には
`... loglevel=4 lsm=landlock,yama,bpf`
のように書かれている部分があるので、その部分のお尻に、`nomodeset`とつけてあげるだけです。
こんな感じに!
`... loglevel=4 lsm=landlock,yama,bpf nomodeset`

## 3.SSDにインストールする

なんとかGUIインストーラーにたどり着いたので、さっき切り出したパーティションにインストールします...ここはあまり詰まりませんでした...

## 4.ついにNixOSが動く！？？

残念ながらそうはいきませんでした....またGUIが映りません....起動中に急に固まって画面左上の端っこに`_`だけが表示される謎に突入しました.......
原因はまたnouveauでした...なのでまたさっきと同じ`nomodeset`をつけたら、画面が映った〜！しかしこれでは謎に引き伸ばされたGUIで気持ち悪いし、画質もおかしいです...なおさねばなりません...なのでちゃんとドライバーを入れてあげます。
まず、NixOSのConfigのあるディレクトリに移動します

```bash
cd /etc/nixos/
```

移動したら、nanoなどのエディダーで`configuration.nix`を開いてファイルの一番下にある`}`の中にこれを追加します。

```nix
hardware.nvidia = {
  open = true;
  nvidiaSettings = true;
  package = config.boot.kernelPackages.nvidiaPackages.stable;
  modesetting.enable = true;
};

hardware.graphics = {
  enable = true;
};

boot.kernelModules = [ "nvidia-uvm" ];

hardware.nvidia-container-toolkit.enable = true;

services.xserver.videoDrivers = [ "nvidia" ];
```

追加したら、このコマンドを実行してビルドしましょう

```bash
sudo nixos-rebuild switch
```

キット`Done`と表示されたら`reboot`してみてください!
多分いい感じに画面が映るようになったはず...!

## 5.一旦NixOSの環境を整える

一旦NixOSは起動するようになったので、次はNixOSを快適に使うために環境を整えます。
(なぜかbootボリュームの容量が残り3KBですって通知が出ていますが、一旦今は気にしません...
どうやらFlakeとやらを使うといいらしい......のでFlakeを使ってみることにしました。
とりあえずホームディレクトリに`config`というフォルダを作成します

```bash
mkdir ~/config
```

次に今使用してるConfigをコピーします。

```bash
cp /etc/nixos/* ~/config/
```

FlakeのConfigファイルを作ります

```bash
touch flake.nix
```

内容は残念ながら僕も完全に理解しきれていないので僕がこの段階で使っていたConfigを貼っておきます... \*このあとセキュアブートで色々躓いて色々変更します.....

```nix
#flake.nix

{
  description = "NixOS configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, home-manager, ... }: {
    nixosConfigurations = {
      nixos = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          home-manager.nixosModules.home-manager
          {
            home-manager.useGlobalPkgs = true;
            home-manager.useUserPackages = true;
          }
        ];
      };
    };
  };
}
```

```nix
#configuration.nix
#さっき書いたGPUドライバー周りの設定にこれを追加した

nix.settings.experimental-features = [ "nix-command" "flakes" ];

home-manager.users.ここは自分のユーザー名 = { pkgs, ... }: {
    home.packages = [
      pkgs.vesktop #Discord
      pkgs.vscode #VScode
    ];

    programs.bash = {
      enable = true;
      shellAliases = {
            #ビルドコマンドを簡略化して使いやすくするエイリアスの登録
            "rebuild" = "sudo nixos-rebuild switch --flake /home/tokuzou/configs#nixos";
        };
    };

    # This value determines the Home Manager release that your configuration is
    # compatible with. This helps avoid breakage when a new Home Manager release
    # introduces backwards incompatible changes.
    #
    # You should not change this value, even if you update Home Manager. If you do
    # want to update the value, then make sure to first check the Home Manager
    # release notes.
    home.stateVersion = "25.11"; # Please read the comment before changing.

};

fonts.packages = with pkgs; [
    noto-fonts-cjk-sans
    noto-fonts-cjk-serif
    noto-fonts-color-emoji
    ipafont
    kochi-substitute
    inter
    nerd-fonts.fira-code
    fira-code
];

#Steamのインストール
programs.steam = {
    enable = true;
    remotePlay.openFirewall = true;
    dedicatedServer.openFirewall = true;
    extraCompatPackages = with pkgs; [
      proton-ge-bin
    ];
};
```

変更したら、もう一度ビルドしてみましょう

```bash
sudo nixos-rebuild switch --flake /home/tokuzou/configs#nixos
```

ビルドが無事`Done`したら次回からの変更は`rebuild`で行えるようになります！便利〜！！
おそらくうまくいっていると、VesktopとVScode、Steamがインストールされているはずです！
これで一応NixOSでゲームをする環境はできました！

### 新しいソフトウェアを入れるには?

ソフトウェアのインストールは`home.packages = []`の中に書けば入れれるって認識で間違っていないと思う.....ソフトウェア内の設定もConfigで管理するときは`programs.`で書くみたいな..?
新しいソフトウェアをインストールするときは[ここ](https://search.nixos.org/packages)で検索すれば大体出てきます。
見つけたソフトウェアの名前をhome.packagesの中に`pkgs.パッケージ名`みたいな感じで書けば良いはず....
https://search.nixos.org/packages

## 6.さて、次はセキュアブートに対応しなきゃ..

快適なWindowsゲーミングをするためにはセキュアブートは絶対です...(VALORANTとか起動したい.....)
まず、セキュアブートをするためには、lanzabooteというの使うといいらしい....
lanzabooteをインストールするために`sbctl`というセキュアブートの管理ツールをインストールしました。`configuration.nix`のパッケージリストに`pkgs.sbctl`を追記するだけでインストールできます。
[ドキュメント](https://nix-community.github.io/lanzaboote/getting-started/prepare-your-system.html#generate-keys)に従って、キーの生成を行いました。
https://nix-community.github.io/lanzaboote/getting-started/prepare-your-system.html#generate-keys

次に、`flake.nix`をこんな感じに書き換えました
(flakeファイルは自分では書けなかったので、Gemini先輩が頑張ってくれました....

```nix
{
  description = "NixOS configuration with Home Manager and Secure Boot (Lanzaboote)";

  inputs = {
    # NixOS Unstable (共通)
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    # Home Manager
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    lanzaboote = {
      url = "github:nix-community/lanzaboote/v1.0.0";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, home-manager, lanzaboote, ... }: {
    nixosConfigurations = {
      nixos = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          home-manager.nixosModules.home-manager
          {
            home-manager.useGlobalPkgs = true;
            home-manager.useUserPackages = true;
          }

          # 3. Lanzaboote モジュール
          lanzaboote.nixosModules.lanzaboote

          # 4. Lanzaboote 用のインライン設定
          ({ pkgs, lib, ... }: {
            environment.systemPackages = [
              # Secure Boot デバッグ・設定用ツール
              pkgs.sbctl
            ];
            # Lanzaboote は systemd-boot
            boot.loader.systemd-boot.enable = lib.mkForce false;

            boot.lanzaboote = {
              enable = true;
              pkiBundle = "/var/lib/sbctl";
            };
          })

        ];
      };
    };
  };
}
```

よし、じゃああとは`rebuild`して〜っと...
ここで問題が発生しました。
bootボリュームの容量が足りません.....とのこと。そういえばさっき残り3KBとか出てたな！！
困りました.....というわけでなんとかしてブートボリュームの容量を増やす必要が出てきました。 `Re:ゼロから始まるブートローダー再構成`を行う必要があります。

## 7.Re:ゼロから始まるブートローダー再構成

さて、パーティションをいじいじしていきます。
といってもパーティションを広げるだけだし！きっとすぐできるよね！きっと！！<-フラグ
パーティションをCLIでいじる気にはなれなかったので、僕はGparted LiveをUSBに入れて使うことにしました。
Gparted Liveは便利でUSBに入れてBootしたらそのままパーティションをいじることができます!!
Gpartedの使い方は簡単なのでおそらく直感的に使えるとは思うのですが、Googleで検索するとたくさん使い方が乗っているので、今回は割愛させてください....(スクショとか撮ってなくて説明しにい....すみません。

パーティションはおそらく一番手前にあるfat32のパーティションを広げてあげればいいと思います。
僕の場合5gbに広げることにしました。NixOSに割り当てたパーティションから5gbを切り出し、パーティションをずらしてなんとか一番手間まで、持ってきて広げてみました....
しか〜〜〜し！なんとfat32は拡張できないらしい......エラーが出てしまいました

作り直さなきゃいけません.....仕方ないです。
一度パーティションを削除し、新しくfat32の5gbのパーティションを作成し、フラグを編集からフラグを設定(`esp,boot`を有効化)します。<-僕はフラグをつけ忘れて先の作業をした後にここにまた戻ってきました。

フラグまで正しく設定したら次はまたNixOSのインストールUSBからLive環境のNixOSを起動します

## 8.NixOSのブートローダーを復元

NixOSのインストーラーを最初に起動したのと同じように起動します。
次にターミナルを開いてコマンドを実行します
最初にボリュームのリストを確認します。

```bash
lsbld -f
```

このコマンドの実行結果からFAT32でフォーマットされている先ほど拡張したbootボリュームと、NixOSをインストールしたボリュームをを見つけます。僕の場合NixOSが入ったボリュームが`nvme0n1p5`
bootボリュームが`nvme0n1p1`でした。bootボリュームはUUIDの方も覚えておいてください。
次はこれらのボリュームをNixOSのライブ環境にマウントします。

```bash
sudo mount /dev/nvme0n1p5 /mnt
sudo mount /dev/nvme0n1p1 /mnt/boot
```

これでNixOSのライブ環境にインストール済みのNix環境を再現する準備ができました。
このコマンドでNixOSに入れます。

```bash
sudo nixos-enter --root /mnt
```

NixOSに入ったらまず、新しくなったbootドライブを設定するために`hardware-configuration.nix`を修正します。

```nix
fileSystems."/boot" =
    {
      device = "/dev/disk/by-uuid/[この部分を新しいボリュームのUUIDに変更する]";
      ...
    };
```

`nano`などを使用して一度`/etc/nixos/`内にある`hardware-configuration.nix`を書き換えることをお勧めします。
書き換えたら、`/home/[ユーザー名]/configs`内にある`hardware-configuration.nix`も置き換えてください。

これでブートローダーを再構成する準備が整ったので、以下のコマンドでブートローダーを修正します。

```bash
sudo nixos-rebuild boot --install-bootloader --flake /home/[ユーザー名]/configs#nixos
```

このコマンドを実行して`Done`が表示されればNixOSは修復完了〜!

## 9.Windowsのブートローダーを復元

次はWindowsを直していきましょう〜!
Windowsも大体やることは同じでした。まずWindowsのインストールUSBを用意してWindowsの回復環境に入りコマンドプロンプトを開いてください。
とりあえず`diskpart`に入ります

```
diskpart
```

diskpartに入ったらボリュームのリストを出します

```
list vol
```

この中からbootボリュームを探します。見つけたら次のコマンドで`S`ドライブにマウントします

```
select vol bootボリュームの番号
assign letter=S
```

次はさっきのリストからWindowsのインストールされているボリュームを探します。次は`X`ドライブにマウントします。

```
select vol Windowsのインストールされたボリュームの番号
assign letter=X
```

マウントできたらdiskpartから抜けます

```
exit
```

あとは仕上げにブートローダーを復元します。

```
bcdboot X:¥Windows /s S: /f UEFI -c
```

ここで僕は詰まりました。`X:`の後にWinまで打ってTabを押すとW:WIndowsと補完されるのですが、これだとエラーが出ます。なので必ず、Xの後に`¥`をつけましょう。(僕の1時間.....うぅ...

このコマンドがエラーなく実行されれば復旧は終わりです！お疲れ様でした！！

## 10.セキュアブートを設定する

最後にセキュアブートの設定です。おそらくNixOS側の設定は先ほどブートローダーを復元するためにビルドした際にセキュアブートの設定も一緒にインストールされたはずです。
なのであとはBIOSの設定からセキュアブートをオンにして、BIOSをセキュアブートのSetup Modeにする必要があります。僕のASUSのマザーボードの場合は既存のセキュアブートキーを削除することでそのモードに入ることができました。

Setup Modeがオンになっていれば、セキュアブートがオンの状態でNixOSをブートできるはずです。
うまくいってなかったら`sbctl`のキーを生成するコマンドをもう一度行ってみたり、rebuildしてみたりするのも効果的かもしれません。

ブートできたら最後の仕上げにこのコマンドでBIOSにキーを登録します。

```bash
sudo sbctl enroll-keys --microsoft
```

このコマンドを実行したら`reboot`してみてください。きっとちゃんと起動するはずです。
ブートメニューのWindowsもきっと正しく起動します。Windowsはパスワードの再設定が求められるかもしれませんが、それは正常なので安心してください。

## 11.長旅の成果

ここまで長旅お疲れ様でした。これでNixOS + Windowsdで快適異世界(systemd-boot)ゲーミングライフを送れますね！クリスマスはぼっちでゲームしましょう！
GG
