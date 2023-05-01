import Phaser from "phaser";

export default class Mob extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, animKey, initHp, dropRate) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.play(animKey);
        this.setDepth(10);
        this.setScale(2);

        this.m_speed = 50;
        this.m_hp = initHp;
        this.m_dropRate = dropRate;

        if (texture === "mob1") {
            this.setBodySize(24, 14, false);
            this.setOffset(0, 14);
        }
        if (texture === "mob2") {
            this.setBodySize(24, 32);
        }
        if (texture === "mob3") {
            this.setBodySize(24, 32);
        }
        if (texture === "mob4") {
            this.setBodySize(24, 32);
        }
        if (texture === "lion") {
            this.setBodySize(40, 64);
        }

        this.m_events = [];
        this.m_events.push(
            this.scene.time.addEvent({
                delay: 100,
                callback: () => {
                    scene.physics.moveToObject(
                        this,
                        scene.m_player,
                        this.m_speed
                    );
                },
                loop: true,
            })
        );

        // Phaser.Scene에는 update 함수가 있지만
        // Mob은 Phaser.Physics.Arcade.Sprite를 상속한 클래스로 update 함수가 없기 때문에
        // Scene의 update가 실행될 때마다 mob도 update 함수가 실행되게 구현해준 부분입니다.
        // https://newdocs.phaser.io/docs/3.60.0-beta.20/Phaser.Scenes.Events.UPDATE
        scene.events.on("update", (time, delta) => {
            this.update(time, delta); // 현재 시간, FPS(Frame per Sec, 1초당 보여주는 프레임 수) 평활화(급격한 변화를 제외) 값
        });
    }

    update() {
        // mob이 없을 경우의 예외처리입니다.
        if (!this.body) return;

        // 오른쪽으로 향할 때는 오른쪽을, 왼쪽으로 향할 때는 왼쪽을 바라보도록 해줍니다.
        if (this.x < this.scene.m_player.x) this.flipX = true;
        else this.flipX = false;
    }
}
